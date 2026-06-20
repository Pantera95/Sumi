"use client";

import { useMemo, useState } from "react";
import {
  companies,
  formatCurrency,
  getAvailableStock,
  getInventoryValue,
  products,
  warehouses,
} from "@/lib/demo-data/catalog";

type InventoryStatus = "Disponible" | "En proceso" | "Critico" | "Sin stock";

const statusStyles: Record<InventoryStatus, string> = {
  Disponible: "bg-emerald-100 text-emerald-800",
  "En proceso": "bg-cyan-100 text-cyan-800",
  Critico: "bg-amber-100 text-amber-800",
  "Sin stock": "bg-rose-100 text-rose-800",
};

const getInventoryStatus = (
  stock: number,
  minimumStock: number,
  inProcess: number,
): InventoryStatus => {
  if (stock === 0) {
    return "Sin stock";
  }

  if (stock <= minimumStock) {
    return "Critico";
  }

  if (inProcess > 0) {
    return "En proceso";
  }

  return "Disponible";
};

export default function InventoryPage() {
  const [company, setCompany] = useState("Todas");
  const [warehouse, setWarehouse] = useState("Todos");
  const [onlyCritical, setOnlyCritical] = useState(false);

  const inventoryRows = useMemo(() => {
    return products
      .map((product) => ({
        ...product,
        available: getAvailableStock(product),
        value: getInventoryValue(product),
        inventoryStatus: getInventoryStatus(
          product.stock,
          product.minimumStock,
          product.inProcess,
        ),
      }))
      .filter((product) => {
        const matchesCompany = company === "Todas" || product.company === company;
        const matchesWarehouse = warehouse === "Todos" || product.warehouse === warehouse;
        const matchesCritical =
          !onlyCritical ||
          product.inventoryStatus === "Critico" ||
          product.inventoryStatus === "Sin stock";

        return matchesCompany && matchesWarehouse && matchesCritical;
      });
  }, [company, onlyCritical, warehouse]);

  const totalStock = inventoryRows.reduce((sum, product) => sum + product.stock, 0);
  const totalAvailable = inventoryRows.reduce((sum, product) => sum + product.available, 0);
  const totalValue = inventoryRows.reduce((sum, product) => sum + product.value, 0);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-300 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              SumiControl
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Inventario por almacen
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/productos"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Ver productos
            </a>
            <button className="rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800">
              Registrar ajuste
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Stock fisico
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalStock}</p>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Disponible real
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalAvailable}</p>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Valor inventario
            </p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(totalValue)}</p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white">
          <div className="grid gap-3 border-b border-slate-200 p-4 lg:grid-cols-[220px_260px_1fr]">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Empresa
              <select
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
              >
                {companies.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Almacen
              <select
                value={warehouse}
                onChange={(event) => setWarehouse(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
              >
                {warehouses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="flex items-end gap-2 text-sm font-medium text-slate-700">
              <input
                checked={onlyCritical}
                onChange={(event) => setOnlyCritical(event.target.checked)}
                type="checkbox"
                className="mb-2 h-4 w-4 rounded border-slate-300 text-cyan-700"
              />
              <span className="pb-1">Mostrar solo criticos y sin stock</span>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Producto</th>
                  <th className="px-4 py-3 font-semibold">Empresa</th>
                  <th className="px-4 py-3 font-semibold">Almacen</th>
                  <th className="px-4 py-3 text-right font-semibold">Fisico</th>
                  <th className="px-4 py-3 text-right font-semibold">Reservado</th>
                  <th className="px-4 py-3 text-right font-semibold">En proceso</th>
                  <th className="px-4 py-3 text-right font-semibold">Disponible</th>
                  <th className="px-4 py-3 text-right font-semibold">Minimo</th>
                  <th className="px-4 py-3 text-right font-semibold">Valor</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inventoryRows.map((product) => (
                  <tr key={product.sku} className="hover:bg-slate-50">
                    <td className="min-w-64 px-4 py-3">
                      <p className="font-medium text-slate-950">{product.name}</p>
                      <p className="mt-1 font-mono text-xs text-slate-500">{product.sku}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{product.company}</td>
                    <td className="whitespace-nowrap px-4 py-3">{product.warehouse}</td>
                    <td className="px-4 py-3 text-right font-medium">{product.stock}</td>
                    <td className="px-4 py-3 text-right">{product.reserved}</td>
                    <td className="px-4 py-3 text-right">{product.inProcess}</td>
                    <td className="px-4 py-3 text-right font-semibold">{product.available}</td>
                    <td className="px-4 py-3 text-right">{product.minimumStock}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(product.value)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${statusStyles[product.inventoryStatus]}`}
                      >
                        {product.inventoryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
            El stock disponible se calcula como fisico menos reservado y en proceso.
          </div>
        </section>
      </div>
    </main>
  );
}
