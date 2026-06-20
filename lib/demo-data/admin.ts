export type ReportStatus = "Listo demo" | "Pendiente data" | "En diseno";

export type ReportRow = {
  name: string;
  area: string;
  owner: string;
  cadence: string;
  company: "Sumigases" | "Sudematin" | "Consolidado";
  period: "Junio 2026" | "Mayo 2026" | "2024 importado";
  status: ReportStatus;
};

export const dashboardChartValues = [38, 52, 44, 68, 58, 76, 64, 82, 73, 88, 79, 92];

export const dashboardOperations = [
  { label: "Cotizaciones por aprobar", value: "14", area: "Owner/Admin" },
  { label: "Notas de entrega pendientes", value: "22", area: "Almacen" },
  { label: "Pagos por verificar", value: "11", area: "Caja" },
  { label: "Importaciones recientes", value: "3", area: "Excel 2024" },
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

