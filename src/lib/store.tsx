"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "@/lib/products";
import { getStoredProducts, setStoredProducts } from "@/lib/product-storage";

export type OrderStatus = "pending" | "processing" | "delivered" | "cancelled";

export type CustomerOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  zone: "inside" | "outside";
  paymentMethod: "cod" | "bkash";
  status: OrderStatus;
  items: Product[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  createdAt: string;
};

type StoredCartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

type StoreContextValue = {
  products: Product[];
  catalogSource: "cloud" | "local";
  cart: Product[];
  orders: CustomerOrder[];
  addProduct: (product: Product) => Promise<"server" | "local">;
  updateProduct: (product: Product) => Promise<"server" | "local">;
  deleteProduct: (id: number) => Promise<"server" | "local">;
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  createOrder: (order: Omit<CustomerOrder, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = "rayyan-cart";
const ORDERS_KEY = "rayyan-orders";

async function fetchCatalog() {
  const response = await fetch("/api/products", { cache: "no-store" });
  if (!response.ok) throw new Error(`Product request failed with ${response.status}.`);
  return await response.json() as Product[];
}

async function cacheCatalog(products: Product[]) {
  try {
    await setStoredProducts(products);
  } catch (error) {
    console.warn("Unable to cache the product catalog locally.", error);
  }
}
function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (error) { console.warn(`Unable to save ${key} to localStorage.`, error); }
}

function normalizeCart(value: unknown, availableProducts: Product[]): StoredCartItem[] {
  if (!Array.isArray(value)) return [];
  const productIds = new Set(availableProducts.map((product) => String(product.id)));
  const items = value.flatMap((item) => {
    if (typeof item !== "object" || item === null) return [];
    const record = item as Partial<StoredCartItem> & Partial<Product>;
    const productId = typeof record.productId === "string" ? record.productId : typeof record.id === "number" ? String(record.id) : "";
    if (!productIds.has(productId)) return [];
    const quantity = typeof record.quantity === "number" && record.quantity > 0 ? Math.floor(record.quantity) : 1;
    return [{ productId, ...(record.variantId ? { variantId: record.variantId } : {}), quantity }];
  });
  return items.reduce<StoredCartItem[]>((current, item) => {
    const existing = current.find((entry) => entry.productId === item.productId && entry.variantId === item.variantId);
    if (existing) existing.quantity += item.quantity;
    else current.push(item);
    return current;
  }, []);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [catalogSource, setCatalogSource] = useState<"cloud" | "local">("cloud");
  const [storedCart, setStoredCart] = useState<StoredCartItem[]>([{ productId: String(seedProducts[0].id), quantity: 1 }]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    const loadStore = async () => {
      let activeProducts = seedProducts;
      try {
        activeProducts = await fetchCatalog();
        await cacheCatalog(activeProducts);
        if (active) setCatalogSource("cloud");
      } catch (error) {
        console.warn("Unable to load products from the API; using the local catalog.", error);
        try {
          activeProducts = await getStoredProducts() || seedProducts;
        } catch (storageError) {
          console.warn("Unable to read the local product catalog.", storageError);
        }
        if (active) setCatalogSource("local");
      }
      if (active) {
        setProducts(activeProducts);
        setStoredCart(normalizeCart(readStorage<unknown>(CART_KEY, [{ productId: String(seedProducts[0].id), quantity: 1 }]), activeProducts));
        setOrders(readStorage(ORDERS_KEY, []));
        setHydrated(true);
      }
    };
    void loadStore();
    return () => { active = false; };
  }, []);

  useEffect(() => { if (hydrated) writeStorage(CART_KEY, storedCart); }, [hydrated, storedCart]);
  useEffect(() => { if (hydrated) writeStorage(ORDERS_KEY, orders); }, [hydrated, orders]);

  const cart = useMemo(() => storedCart.flatMap((item) => {
    const product = products.find((entry) => String(entry.id) === item.productId);
    return product ? Array.from({ length: item.quantity }, () => product) : [];
  }), [products, storedCart]);

  const value: StoreContextValue = {
    products,
    catalogSource,
    cart,
    orders,
    addProduct: async (product) => {
      try {
        const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) });
        if (!response.ok) throw new Error(`Product save failed with ${response.status}.`);
        const payload = await response.json() as { success: boolean; product: Product };
        if (!payload.success || !payload.product) throw new Error("Invalid product save response.");
        let nextProducts: Product[];
        try {
          nextProducts = await fetchCatalog();
        } catch {
          nextProducts = products.some((item) => item.id === payload.product.id) ? products.map((item) => item.id === payload.product.id ? payload.product : item) : [...products, payload.product];
        }
        setProducts(nextProducts);
        await cacheCatalog(nextProducts);
        setCatalogSource("cloud");
        return "server";
      } catch (error) {
        console.warn("Unable to save product to the API; saving locally instead.", error);
        const nextProducts = products.some((item) => item.id === product.id) ? products.map((item) => item.id === product.id ? product : item) : [...products, product];
        await cacheCatalog(nextProducts);
        setProducts(nextProducts);
        setCatalogSource("local");
        return "local";
      }
    },
    updateProduct: async (product) => {
      try {
        const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) });
        if (!response.ok) throw new Error(`Product save failed with ${response.status}.`);
        const payload = await response.json() as { success: boolean; product: Product };
        if (!payload.success || !payload.product) throw new Error("Invalid product update response.");
        let nextProducts: Product[];
        try {
          nextProducts = await fetchCatalog();
        } catch {
          nextProducts = products.map((item) => item.id === payload.product.id ? payload.product : item);
        }
        setProducts(nextProducts);
        await cacheCatalog(nextProducts);
        setCatalogSource("cloud");
        return "server";
      } catch (error) {
        console.warn("Unable to update product through the API; saving locally instead.", error);
        const nextProducts = products.map((item) => item.id === product.id ? product : item);
        await cacheCatalog(nextProducts);
        setProducts(nextProducts);
        setCatalogSource("local");
        return "local";
      }
    },
    deleteProduct: async (id) => {
      try {
        const response = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error(`Product delete failed with ${response.status}.`);
        const payload = await response.json() as { success: boolean };
        if (!payload.success) throw new Error("Invalid product delete response.");
        let nextProducts: Product[];
        try {
          nextProducts = await fetchCatalog();
        } catch {
          nextProducts = products.filter((item) => item.id !== id);
        }
        setProducts(nextProducts);
        await cacheCatalog(nextProducts);
        setCatalogSource("cloud");
        return "server";
      } catch (error) {
        console.warn("Unable to delete product through the API; deleting locally instead.", error);
        const nextProducts = products.filter((item) => item.id !== id);
        await cacheCatalog(nextProducts);
        setProducts(nextProducts);
        setCatalogSource("local");
        return "local";
      }
    },
    addToCart: (product) => setStoredCart((current) => {
      const existing = current.find((item) => item.productId === String(product.id));
      if (existing) return current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { productId: String(product.id), quantity: 1 }];
    }),
    removeFromCart: (index) => setStoredCart((current) => {
      let itemIndex = 0;
      return current.flatMap((item) => {
        if (index < itemIndex || index >= itemIndex + item.quantity) {
          itemIndex += item.quantity;
          return [item];
        }
        itemIndex += item.quantity;
        return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
      });
    }),
    clearCart: () => setStoredCart([]),
    createOrder: (order) => {
      setOrders((current) => [{ ...order, id: `RY-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: "pending" }, ...current]);
      setStoredCart([]);
    },
    updateOrderStatus: (id, status) => setOrders((current) => current.map((order) => order.id === id ? { ...order, status } : order)),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
