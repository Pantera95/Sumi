export type ProductStatus = "Activo" | "Critico" | "Inactivo";

export type Product = {
  sku: string;
  name: string;
  category: string;
  subcategory: string;
  company: "Sumigases" | "Sudematin";
  warehouse: string;
  stock: number;
  reserved: number;
  inProcess: number;
  minimumStock: number;
  cost: number;
  price: number;
  iva: boolean;
  status: ProductStatus;
};

export const products: Product[] = [
  {
    sku: "GAS-0001",
    name: "Oxigeno industrial 6 m3",
    category: "Gases industriales y medicinales",
    subcategory: "Oxigeno",
    company: "Sumigases",
    warehouse: "Principal Barcelona",
    stock: 42,
    reserved: 8,
    inProcess: 12,
    minimumStock: 18,
    cost: 31,
    price: 48,
    iva: true,
    status: "Activo",
  },
  {
    sku: "GAS-0002",
    name: "Acetileno industrial",
    category: "Gases industriales y medicinales",
    subcategory: "Acetileno",
    company: "Sumigases",
    warehouse: "Principal Barcelona",
    stock: 9,
    reserved: 6,
    inProcess: 5,
    minimumStock: 16,
    cost: 52,
    price: 74,
    iva: true,
    status: "Critico",
  },
  {
    sku: "MAQ-0001",
    name: "Maquina inversora 220V",
    category: "Maquinas de soldar y equipos",
    subcategory: "Inversoras",
    company: "Sudematin",
    warehouse: "Tienda Puerto La Cruz",
    stock: 14,
    reserved: 1,
    inProcess: 2,
    minimumStock: 5,
    cost: 165,
    price: 235,
    iva: true,
    status: "Activo",
  },
  {
    sku: "ELE-0001A",
    name: "Electrodo 6013 1/8",
    category: "Electrodos y varillas",
    subcategory: "6013",
    company: "Sudematin",
    warehouse: "Tienda Puerto La Cruz",
    stock: 180,
    reserved: 24,
    inProcess: 36,
    minimumStock: 80,
    cost: 1.7,
    price: 2.6,
    iva: true,
    status: "Activo",
  },
  {
    sku: "REG-0001",
    name: "Regulador oxigeno doble reloj",
    category: "Reguladores y valvulas",
    subcategory: "Reguladores",
    company: "Sumigases",
    warehouse: "Principal Barcelona",
    stock: 4,
    reserved: 2,
    inProcess: 3,
    minimumStock: 10,
    cost: 22,
    price: 39,
    iva: true,
    status: "Critico",
  },
  {
    sku: "EPP-0001",
    name: "Careta fotosensible",
    category: "Equipo de proteccion personal",
    subcategory: "Caretas",
    company: "Sudematin",
    warehouse: "Tienda Puerto La Cruz",
    stock: 0,
    reserved: 0,
    inProcess: 0,
    minimumStock: 6,
    cost: 28,
    price: 45,
    iva: true,
    status: "Inactivo",
  },
];

export const categories = [
  "Todas",
  ...Array.from(new Set(products.map((product) => product.category))),
];

export const companies = ["Todas", "Sumigases", "Sudematin"];

export const warehouses = [
  "Todos",
  ...Array.from(new Set(products.map((product) => product.warehouse))),
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

export const getAvailableStock = (product: Product) =>
  Math.max(product.stock - product.reserved - product.inProcess, 0);

export const getMargin = (product: Product) => product.price - product.cost;

export const getRoi = (product: Product) =>
  Math.round((getMargin(product) / product.cost) * 100);

export const getInventoryValue = (product: Product) => product.stock * product.cost;

