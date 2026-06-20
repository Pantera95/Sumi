export type ReportStatus = "Listo demo" | "Pendiente data" | "En diseno";
export type AdminCompany = "Sumigases" | "Sudematin" | "Consolidado";
export type AdminPeriod = "Junio 2026" | "Mayo 2026" | "2024 importado";

export type ReportRow = {
  name: string;
  area: string;
  owner: string;
  cadence: string;
  company: AdminCompany;
  period: AdminPeriod;
  status: ReportStatus;
};

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
  trend: string;
  trendDirection: "up" | "down" | "flat";
  area: "sales" | "finance" | "inventory" | "cylinders";
  company: AdminCompany;
  period: AdminPeriod;
};

export type DashboardOperation = {
  label: string;
  value: string;
  area: string;
  company: AdminCompany;
  period: AdminPeriod;
  priority: "Alta" | "Media" | "Baja";
};

export type DashboardAlert = {
  id: string;
  title: string;
  module: string;
  owner: string;
  priority: "Alta" | "Media" | "Baja";
  company: AdminCompany;
  period: AdminPeriod;
};

export const dashboardChartValues = [38, 52, 44, 68, 58, 76, 64, 82, 73, 88, 79, 92];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Ventas hoy",
    value: "$ 8.420",
    detail: "34 documentos internos",
    trend: "+12%",
    trendDirection: "up",
    area: "sales",
    company: "Sumigases",
    period: "Junio 2026",
  },
  {
    label: "Cuentas por cobrar",
    value: "$ 18.950",
    detail: "9 clientes con alerta",
    trend: "8-15 dias",
    trendDirection: "flat",
    area: "finance",
    company: "Sumigases",
    period: "Junio 2026",
  },
  {
    label: "Stock critico",
    value: "27",
    detail: "5 almacenes revisados",
    trend: "-4",
    trendDirection: "down",
    area: "inventory",
    company: "Sumigases",
    period: "Junio 2026",
  },
  {
    label: "Cilindros pendientes",
    value: "63",
    detail: "Retorno por cliente",
    trend: "+7",
    trendDirection: "up",
    area: "cylinders",
    company: "Sumigases",
    period: "Junio 2026",
  },
  {
    label: "Ventas hoy",
    value: "$ 4.180",
    detail: "19 documentos internos",
    trend: "+8%",
    trendDirection: "up",
    area: "sales",
    company: "Sudematin",
    period: "Junio 2026",
  },
  {
    label: "Stock critico",
    value: "11",
    detail: "2 almacenes revisados",
    trend: "-2",
    trendDirection: "down",
    area: "inventory",
    company: "Sudematin",
    period: "Junio 2026",
  },
  {
    label: "Ventas importadas",
    value: "$ 318.400",
    detail: "Resumen 2024",
    trend: "base",
    trendDirection: "flat",
    area: "sales",
    company: "Consolidado",
    period: "2024 importado",
  },
  {
    label: "ROI promedio",
    value: "34%",
    detail: "Matriz historica",
    trend: "+6%",
    trendDirection: "up",
    area: "finance",
    company: "Consolidado",
    period: "2024 importado",
  },
];

export const dashboardOperations: DashboardOperation[] = [
  {
    label: "Cotizaciones por aprobar",
    value: "14",
    area: "Owner/Admin",
    company: "Sumigases",
    period: "Junio 2026",
    priority: "Alta",
  },
  {
    label: "Notas de entrega pendientes",
    value: "22",
    area: "Almacen",
    company: "Sumigases",
    period: "Junio 2026",
    priority: "Alta",
  },
  {
    label: "Pagos por verificar",
    value: "11",
    area: "Caja",
    company: "Sudematin",
    period: "Junio 2026",
    priority: "Media",
  },
  {
    label: "Importaciones recientes",
    value: "3",
    area: "Excel 2024",
    company: "Consolidado",
    period: "2024 importado",
    priority: "Media",
  },
];

export const dashboardAlerts: DashboardAlert[] = [
  {
    id: "alert-stock-oxygen",
    title: "Oxigeno industrial cerca del minimo",
    module: "Inventario",
    owner: "Almacen",
    priority: "Alta",
    company: "Sumigases",
    period: "Junio 2026",
  },
  {
    id: "alert-cash-payments",
    title: "Pagos moviles pendientes por verificar",
    module: "Caja",
    owner: "Caja",
    priority: "Media",
    company: "Sudematin",
    period: "Junio 2026",
  },
  {
    id: "alert-roi-data",
    title: "ROI 2024 requiere equivalencias finales",
    module: "Reportes",
    owner: "Owner",
    priority: "Media",
    company: "Consolidado",
    period: "2024 importado",
  },
  {
    id: "alert-cylinder-return",
    title: "Cilindros pendientes superan el umbral",
    module: "Cilindros",
    owner: "Operaciones",
    priority: "Alta",
    company: "Sumigases",
    period: "Junio 2026",
  },
];

export const uiFoundations = [
  "Tokens visuales claro/oscuro",
  "Botones, badges, cards y metric cards",
  "Sidebar administrativo responsive",
  "Header con busqueda y acciones",
  "Base lista para modulos futuros",
];

export const reportRows: ReportRow[] = [
  {
    name: "Ventas por producto",
    area: "Ventas",
    owner: "Admin",
    cadence: "Diario",
    company: "Sumigases",
    period: "Junio 2026",
    status: "Listo demo",
  },
  {
    name: "Stock critico por almacen",
    area: "Inventario",
    owner: "Almacen",
    cadence: "Diario",
    company: "Sumigases",
    period: "Junio 2026",
    status: "Listo demo",
  },
  {
    name: "ROI por categoria",
    area: "Rentabilidad",
    owner: "Owner",
    cadence: "Semanal",
    company: "Consolidado",
    period: "2024 importado",
    status: "Pendiente data",
  },
  {
    name: "Cuentas por cobrar vencidas",
    area: "Finanzas",
    owner: "Caja",
    cadence: "Diario",
    company: "Sudematin",
    period: "Mayo 2026",
    status: "En diseno",
  },
  {
    name: "Cilindros pendientes por cliente",
    area: "Cilindros",
    owner: "Operaciones",
    cadence: "Semanal",
    company: "Sumigases",
    period: "Junio 2026",
    status: "Pendiente data",
  },
  {
    name: "Pagos por metodo",
    area: "Finanzas",
    owner: "Caja",
    cadence: "Diario",
    company: "Consolidado",
    period: "Junio 2026",
    status: "Listo demo",
  },
  {
    name: "Importaciones con diferencias",
    area: "Importaciones",
    owner: "Admin",
    cadence: "Bajo demanda",
    company: "Consolidado",
    period: "2024 importado",
    status: "En diseno",
  },
  {
    name: "Rotacion por categoria",
    area: "Inventario",
    owner: "Owner",
    cadence: "Mensual",
    company: "Sudematin",
    period: "Mayo 2026",
    status: "Pendiente data",
  },
];

export const roiMatrix = [
  { label: "Productos", value: 41 },
  { label: "Compras", value: 28 },
  { label: "Clientes", value: 35 },
  { label: "Cilindros", value: 19 },
];
