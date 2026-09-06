"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products as seedProducts, type Product } from "@/lib/products";

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

type StoreContextValue = {
  products: Product[];
  cart: Product[];
  orders: CustomerOrder[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  createOrder: (order: Omit<CustomerOrder, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const PRODUCTS_KEY = "rayyan-products";
const CART_KEY = "rayyan-cart";
const ORDERS_KEY = "rayyan-orders";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [cart, setCart] = useState<Product[]>([seedProducts[0]]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setProducts(readStorage(PRODUCTS_KEY, seedProducts));
      setCart(readStorage(CART_KEY, [seedProducts[0]]));
      setOrders(readStorage(ORDERS_KEY, []));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => { if (hydrated) window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)); }, [hydrated, products]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [hydrated, orders]);

  const value: StoreContextValue = {
    products,
    cart,
    orders,
    addProduct: (product) => setProducts((current) => [...current, product]),
    updateProduct: (product) => setProducts((current) => current.map((item) => item.id === product.id ? product : item)),
    deleteProduct: (id) => setProducts((current) => current.filter((item) => item.id !== id)),
    addToCart: (product) => setCart((current) => [...current, product]),
    removeFromCart: (index) => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index)),
    clearCart: () => setCart([]),
    createOrder: (order) => {
      setOrders((current) => [{ ...order, id: `RY-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: "pending" }, ...current]);
      setCart([]);
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
