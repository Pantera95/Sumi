"use client";

import { useMemo, useState } from "react";
import { categories, companies, formatCurrency, getRoi, products } from "@/lib/demo-data/catalog";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [company, setCompany] = useState("Todas");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.sku.toLowerCase().includes(normalizedQuery) ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.subcategory.toLowerCase().includes(normalizedQuery);

      const matchesCategory = category === "Todas" || product.category === category;
      const matchesCompany = company === "Todas" || product.company === company;

      return matchesQuery && matchesCategory && matchesCompany;
    });
  }, [category, company, query]);

  const totalStock = filteredProducts.reduce((sum, product) => sum + product.stock, 0);
  const criticalCount = filteredProducts.filter((product) => product.status === "Critico").length;
  const inventoryCost = filteredProducts.reduce(
    (sum, product) => sum + product.stock * product.cost,
    0,
  );

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-300 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
              SumiControl
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Productos y catalogo
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/inventario"
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Ver inventario
            </a>
            <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50">
              Importar Excel
            </button>
            <button className="rounded-md bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800">
              Nuevo producto
            </button>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Productos visibles
            </p>
            <p className="mt-2 text-2xl font-semibold">{filteredProducts.length}</p>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Stock disponible
            </p>
            <p className="mt-2 text-2xl font-semibold">{totalStock}</p>
          </div>
          <div className="rounded-lg border border-slate-300 bg-white p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Costo inventario
            </p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(inventoryCost)}</p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-300 bg-white">
          <div className="grid gap-3 border-b border-slate-200 p-4 lg:grid-cols-[1fr_260px_180px]">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Buscar
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
                placeholder="SKU, producto o subcategoria"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Categoria
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/15"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

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
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">SKU</th>
                  <th className="px-4 py-3 font-semibold">Producto</th>
                  <th className="px-4 py-3 font-semibold">Empresa</th>
                  <th className="px-4 py-3 font-semibold">Almacen</th>
                  <th className="px-4 py-3 text-right font-semibold">Stock</th>
                  <th className="px-4 py-3 text-right font-semibold">Reservado</th>
                  <th className="px-4 py-3 text-right font-semibold">Precio</th>
                  <th className="px-4 py-3 text-right font-semibold">ROI</th>
                  <th className="px-4 py-3 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map((product) => (
                  <tr key={product.sku} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-700">
                      {product.sku}
                    </td>
                    <td className="min-w-64 px-4 py-3">
                      <p className="font-medium text-slate-950">{product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {product.category} / {product.subcategory}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{product.company}</td>
                    <td className="whitespace-nowrap px-4 py-3">{product.warehouse}</td>
                    <td className="px-4 py-3 text-right font-medium">{product.stock}</td>
                    <td className="px-4 py-3 text-right">{product.reserved}</td>
                    <td className="px-4 py-3 text-right">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 text-right font-medium">{getRoi(product)}%</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          "inline-flex rounded-md px-2 py-1 text-xs font-semibold " +
                          (product.status === "Activo"
                            ? "bg-emerald-100 text-emerald-800"
                            : product.status === "Critico"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-200 text-slate-700")
                        }
                      >
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>{criticalCount} productos criticos</span>
            <span>Data demo local</span>
          </div>
        </section>
      </div>
    </main>
  );
}
