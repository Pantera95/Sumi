import { PageHeader } from "@/components/layout/PageHeader";
import { DataTableShell } from "@/components/ui/DataTableShell";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

const selectClass = "h-10 rounded-xl border border-border bg-surface px-3 text-sm text-text";

// Subconjunto real del catálogo Sumigases 2024 (ver docs/data/catalog-inventory-mock-2024.md).
const products = [
  { sku: "GAS-0001", nombre: "Oxígeno gaseoso cil 6M³", cat: "Gases", precio: 16.01, costo: 8.98, stock: 18, min: 10, roi: 78 },
  { sku: "GAS-0002", nombre: "Nitrógeno gaseoso cil 6M³", cat: "Gases", precio: 38.04, costo: 17.52, stock: 9, min: 8, roi: 316 },
  { sku: "ANT-0001", nombre: "Antorcha TIG 200A flex", cat: "Antorchas", precio: 172.65, costo: 122.69, stock: 6, min: 3, roi: 41 },
  { sku: "REG-0001", nombre: "Regulador de argón c/ flujómetro", cat: "Reguladores", precio: 63.87, costo: 25.81, stock: 7, min: 5, roi: 147 },
  { sku: "ELE-0001", nombre: "Electrodo 6010 5/32 Linconl", cat: "Electrodos", precio: 6.24, costo: 4.05, stock: 120, min: 50, roi: 54 },
  { sku: "ELE-0003", nombre: "Electrodo 7018 5/32 Linconl", cat: "Electrodos", precio: 5.86, costo: 1.47, stock: 90, min: 50, roi: 298 },
  { sku: "ANT-0002", nombre: 'Soplete 36" Victor Weldtech', cat: "Antorchas", precio: 311.38, costo: 105.0, stock: 2, min: 2, roi: 197 },
  { sku: "REP-0001", nombre: "Manguera morocha 1/4 GNC", cat: "Repuestos", precio: 5.78, costo: 3.3, stock: 80, min: 40, roi: 75 },
];

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventario"
        description="Stock por empresa y almacén, con costo, margen y ROI por producto."
        breadcrumbs={[{ label: "Inventario" }, { label: "Inventario" }]}
        actions={
          <>
            <Button variant="secondary" icon="import">Importar</Button>
            <Button icon="plus">Nuevo producto</Button>
          </>
        }
      />

      <DataTableShell
        title="Productos en stock"
        description="8 de 262 productos cargados desde la matriz 2024."
        searchPlaceholder="Buscar por SKU o nombre…"
        filters={
          <>
            <select className={selectClass} defaultValue="all" aria-label="Categoría">
              <option value="all">Todas las categorías</option>
              <option>Gases</option>
              <option>Electrodos</option>
              <option>Antorchas</option>
              <option>Reguladores</option>
              <option>Repuestos</option>
            </select>
            <select className={selectClass} defaultValue="all" aria-label="Almacén">
              <option value="all">Todos los almacenes</option>
              <option>Lechería</option>
              <option>Cumaná</option>
            </select>
          </>
        }
      >
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr className="border-b border-border">
              <th className="py-2.5 pr-3 font-medium">SKU</th>
              <th className="py-2.5 pr-3 font-medium">Producto</th>
              <th className="py-2.5 pr-3 font-medium">Categoría</th>
              <th className="py-2.5 pr-3 text-right font-medium">Precio</th>
              <th className="py-2.5 pr-3 text-right font-medium">Costo</th>
              <th className="py-2.5 pr-3 text-right font-medium">Stock</th>
              <th className="py-2.5 pr-3 text-right font-medium">ROI</th>
              <th className="py-2.5 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => {
              const critical = p.stock <= p.min;
              return (
                <tr key={p.sku} className="hover:bg-surface-2">
                  <td className="py-2.5 pr-3 font-mono text-xs text-muted">{p.sku}</td>
                  <td className="py-2.5 pr-3 text-text">{p.nombre}</td>
                  <td className="py-2.5 pr-3 text-muted">{p.cat}</td>
                  <td className="py-2.5 pr-3 text-right text-text">${p.precio.toFixed(2)}</td>
                  <td className="py-2.5 pr-3 text-right text-muted">${p.costo.toFixed(2)}</td>
                  <td className="py-2.5 pr-3 text-right text-text">{p.stock}</td>
                  <td className="py-2.5 pr-3 text-right">
                    <span className="font-medium text-ok">{p.roi}%</span>
                  </td>
                  <td className="py-2.5">
                    {critical ? (
                      <StatusBadge tone="danger">Stock crítico</StatusBadge>
                    ) : (
                      <StatusBadge tone="ok">Disponible</StatusBadge>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DataTableShell>
    </>
  );
}
