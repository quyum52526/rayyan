"use client";

import { ArrowLeft, Edit3, LayoutDashboard, Package, Plus, Save, ShoppingBag, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useStore, type OrderStatus } from "@/lib/store";
import { compressImage } from "@/lib/compressImage";

const categories = ["গুঁড়া মসলা", "গোটা মসলা", "রেডি-টু-কুক", "প্রিমিয়াম কম্বো"];
const emptyForm = { name: "", bn: "", category: categories[0], price: "", oldPrice: "", stock: "", sku: "", image: "", image2: "", video: "" };
type FormState = typeof emptyForm;

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AdminPage() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [section, setSection] = useState<"overview" | "products" | "orders">("overview");
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [uploadError, setUploadError] = useState("");
  const mediaError = uploadError;

  const openNew = () => { setEditing(null); setForm(emptyForm); setUploadError(""); setSection("products"); };
  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({ name: product.name, bn: product.bn, category: product.category, price: String(product.price), oldPrice: String(product.oldPrice), stock: String(product.stock), sku: product.sku || "", image: product.image, image2: product.image2 || "", video: product.video || "" });
    setSection("products");
  };
  const updateField = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const handleFile = async (key: "image" | "image2" | "video", file?: File) => {
    if (!file) return;
    if (file.size > 2_500_000) { setUploadError("ফাইল ২.৫ MB-এর মধ্যে রাখুন।"); return; }
    setUploadError("");
    try {
      updateField(key, key === "video" ? await fileToDataUrl(file) : await compressImage(file));
    } catch {
      setUploadError("ফাইলটি পড়া যায়নি। অন্য একটি ছবি দিয়ে আবার চেষ্টা করুন।");
    }
  };
  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product: Product = { id: editing?.id || Date.now(), slug: (form.name || form.bn).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `rayyan-${Date.now()}`, sku: form.sku || `RY-${Date.now().toString().slice(-4)}`, name: form.name, bn: form.bn, category: form.category, price: Number(form.price), oldPrice: Number(form.oldPrice || form.price), stock: Number(form.stock), rating: editing?.rating || 5, reviews: editing?.reviews || 0, image: form.image || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85", image2: form.image2 || form.image, video: form.video };
    try {
      const saveMode = editing ? await updateProduct(product) : await addProduct(product);
      if (saveMode === "local") window.alert("API সংরক্ষণ ব্যর্থ হয়েছে, তাই পণ্যটি এই ব্রাউজারে সংরক্ষণ করা হয়েছে।");
      setEditing(null); setForm(emptyForm); setUploadError("");
    } catch {
      setUploadError("পণ্যটি স্থানীয়ভাবে সংরক্ষণ করা যায়নি। ব্রাউজারের IndexedDB সক্রিয় আছে কি না পরীক্ষা করুন।");
    }
  };

  return <main className="admin-shell"><aside className="admin-sidebar"><Link className="logo admin-logo" href="/">RAYYAN<span>ADMIN STUDIO</span></Link><div className="admin-nav"><button className={section === "overview" ? "active" : ""} onClick={() => setSection("overview")}><LayoutDashboard size={17} /> ওভারভিউ</button><button className={section === "products" ? "active" : ""} onClick={() => setSection("products")}><Package size={17} /> পণ্য ক্যাটালগ</button><button className={section === "orders" ? "active" : ""} onClick={() => setSection("orders")}><ShoppingBag size={17} /> অর্ডার <b>{orders.length}</b></button></div><Link className="admin-store-link" href="/"><ArrowLeft size={16} /> স্টোরফ্রন্টে ফিরুন</Link></aside><section className="admin-main"><header className="admin-topbar"><div><p className="kicker">RAYYAN CONTROL ROOM</p><h1>{section === "overview" ? "আজকের ব্যবসা" : section === "products" ? "পণ্য ক্যাটালগ" : "গ্রাহকের অর্ডার"}</h1></div>{section === "products" && <button className="primary-button" onClick={openNew}><Plus size={17} /> নতুন পণ্য</button>}</header>{section === "overview" && <Overview products={products} orders={orders.length} onProducts={() => setSection("products")} onOrders={() => setSection("orders")} />}{section === "products" && <div className="admin-content"><form className="admin-form" onSubmit={saveProduct}><div className="admin-form-heading"><div><p className="kicker">{editing ? "EDIT PRODUCT" : "NEW PRODUCT"}</p><h2>{editing ? "পণ্য আপডেট করুন" : "নতুন পণ্য যোগ করুন"}</h2></div>{editing && <button type="button" className="icon-button" onClick={() => { setEditing(null); setForm(emptyForm); }} aria-label="ফর্ম বন্ধ করুন"><X size={19} /></button>}</div><div className="admin-form-grid"><label>ইংরেজি নাম<input required value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Premium Turmeric Powder" /></label><label>বাংলা নাম<input required value={form.bn} onChange={(e) => updateField("bn", e.target.value)} placeholder="প্রিমিয়াম হলুদ গুঁড়া" /></label><label>SKU<input value={form.sku} onChange={(e) => updateField("sku", e.target.value)} placeholder="RY-005" /></label><label>ক্যাটাগরি<select value={form.category} onChange={(e) => updateField("category", e.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>বিক্রয় মূল্য<input required type="number" min="0" value={form.price} onChange={(e) => updateField("price", e.target.value)} /></label><label>মূল মূল্য<input type="number" min="0" value={form.oldPrice} onChange={(e) => updateField("oldPrice", e.target.value)} /></label><label>স্টক<input required type="number" min="0" value={form.stock} onChange={(e) => updateField("stock", e.target.value)} /></label></div><div className="media-upload-grid"><MediaField label="প্রধান ছবি" value={form.image} onChange={(file) => handleFile("image", file)} /><MediaField label="দ্বিতীয় ছবি" value={form.image2} onChange={(file) => handleFile("image2", file)} /><MediaField label="প্রোমো ভিডিও" value={form.video} onChange={(file) => handleFile("video", file)} accept="video/*" /></div>{mediaError && <p className="form-error">{mediaError}</p>}<button className="primary-button admin-save"><Save size={17} /> {editing ? "পরিবর্তন সংরক্ষণ করুন" : "পণ্য প্রকাশ করুন"}</button></form><div className="admin-table-panel"><div className="table-heading"><div><p className="kicker">INVENTORY</p><h2>সব পণ্য <span>{products.length}</span></h2></div><span className="storage-note">লোকাল স্টোরেজে সংরক্ষিত</span></div><div className="product-admin-list">{products.map((product) => <div className="product-admin-row" key={product.id}><img src={product.image} alt="" /><div className="admin-product-name"><strong>{product.bn}</strong><span>{product.name} · {product.sku}</span></div><div className="admin-stock"><small>স্টক</small><b className={product.stock < 10 ? "low-stock" : ""}>{product.stock}</b></div><strong className="admin-price">৳{product.price.toLocaleString("bn-BD")}</strong><button className="table-icon" onClick={() => openEdit(product)} aria-label="পণ্য সম্পাদনা"><Edit3 size={16} /></button><button className="table-icon danger" onClick={() => { if (window.confirm("এই পণ্যটি মুছে ফেলবেন?")) deleteProduct(product.id); }} aria-label="পণ্য মুছুন"><Trash2 size={16} /></button></div>)}</div></div></div>}{section === "orders" && <OrderTable orders={orders} onStatusChange={updateOrderStatus} />}</section></main>;
}

function Overview({ products, orders, onProducts, onOrders }: { products: Product[]; orders: number; onProducts: () => void; onOrders: () => void }) {
  const inventory = products.reduce((sum, product) => sum + product.stock, 0);
  return <div className="admin-overview"><div className="metric-grid"><button onClick={onProducts}><span>মোট পণ্য</span><strong>{products.length}</strong><small>ক্যাটালগে সক্রিয় আইটেম</small></button><button onClick={onProducts}><span>মোট স্টক</span><strong>{inventory}</strong><small>ইউনিট ইনভেন্টরি</small></button><button onClick={onOrders}><span>অর্ডার</span><strong>{orders}</strong><small>লোকাল অর্ডার কিউ</small></button><button onClick={onProducts}><span>লো স্টক</span><strong>{products.filter((product) => product.stock < 10).length}</strong><small>মনোযোগ প্রয়োজন</small></button></div><div className="admin-callout"><div><p className="kicker">QUICK ACTION</p><h2>আজকের ক্যাটালগ ঠিকঠাক রাখুন</h2><p>পণ্যের ছবি, দাম ও স্টক পরিবর্তন করলে তা সঙ্গে সঙ্গে স্টোরফ্রন্টে দেখা যাবে।</p></div><button className="primary-button" onClick={onProducts}><Package size={17} /> পণ্য ম্যানেজ করুন</button></div></div>;
}

function MediaField({ label, value, onChange, accept = "image/*" }: { label: string; value: string; onChange: (file?: File) => void; accept?: string }) {
  return <label className="media-field"><span>{label}</span><div className="media-preview">{value ? (accept.startsWith("video") ? <video src={value} muted /> : <img src={value} alt="" />) : <Package size={22} />}</div><input type="file" accept={accept} onChange={(event) => onChange(event.target.files?.[0])} /><small>{value ? "ফাইল পরিবর্তন করতে ক্লিক করুন" : "ছবি বা ভিডিও আপলোড করুন"}</small></label>;
}

function OrderTable({ orders, onStatusChange }: { orders: ReturnType<typeof useStore>["orders"]; onStatusChange: (id: string, status: OrderStatus) => void }) {
  return <div className="admin-table-panel orders-panel"><div className="table-heading"><div><p className="kicker">FULFILLMENT</p><h2>অর্ডার তালিকা <span>{orders.length}</span></h2></div></div>{orders.length === 0 ? <div className="empty-state"><ShoppingBag size={28} /><h3>এখনও কোনো অর্ডার নেই</h3><p>স্টোরফ্রন্টের checkout থেকে তৈরি অর্ডার এখানে দেখা যাবে।</p></div> : <div className="order-list">{orders.map((order) => <article className="order-row" key={order.id}><div className="order-top"><div><strong>{order.id}</strong><span>{new Date(order.createdAt).toLocaleString("bn-BD")}</span></div><select value={order.status} onChange={(event) => onStatusChange(order.id, event.target.value as OrderStatus)}><option value="pending">পেন্ডিং</option><option value="processing">প্রসেসিং</option><option value="delivered">ডেলিভার্ড</option><option value="cancelled">বাতিল</option></select></div><div className="order-details"><div><small>গ্রাহক</small><b>{order.customerName}</b><span>{order.phone}</span></div><div><small>ডেলিভারি ঠিকানা</small><span>{order.address}</span><span>{order.zone === "inside" ? "ঢাকার ভিতরে · ৳৬০" : "ঢাকার বাইরে · ৳১২০"}</span></div><div><small>পণ্য</small>{order.items.map((item, index) => <span key={`${item.id}-${index}`}>{item.bn} × ১</span>)}</div><div className="order-total"><small>সর্বমোট</small><strong>৳{order.grandTotal.toLocaleString("bn-BD")}</strong><span>ক্যাশ অন ডেলিভারি</span></div></div></article>)}</div>}</div>;
}
