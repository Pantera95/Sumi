"use client";

/**
 * Gráficas BI dinámicas (Recharts), portadas del panel de Ranko y adaptadas a los tokens de
 * SumiControl (naranja/navy/dorado, claro-oscuro). Tooltips, leyendas y ejes interactivos.
 * Data real Sumigases 2024 (ver lib/ux/dashboard-data.ts).
 */

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { months, series, categoriasMasRentables } from "@/lib/ux/dashboard-data";

const axisStyle = { fill: "var(--color-muted)", fontSize: 11 } as const;

const tooltipContentStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-text)",
  fontSize: 12,
} as const;

const tooltipLabelStyle = { color: "var(--color-brand)", fontWeight: 700 } as const;

const legendFormatter = (value: string) => (
  <span style={{ color: "var(--color-muted)", fontSize: 11 }}>{value}</span>
);

const fmtK = (v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`);

const monthly = months.map((mes, i) => ({
  mes,
  ventas: series.ventas[i],
  utilidad: series.utilidad[i],
  compras: series.compras[i],
}));

const DONUT_COLORS = ["var(--color-brand)", "var(--color-navy)", "var(--color-accent)", "var(--color-info)"];

// ─── Ventas vs Utilidad (líneas) ───────────────────────────────────────────────
export function BiVentasUtilidad() {
  return (
    <ResponsiveContainer height={280} width="100%">
      <LineChart data={monthly} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtK(v as number)} />
        <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} formatter={(v) => fmtK(Number(v))} />
        <Legend formatter={legendFormatter} />
        <Line type="monotone" dataKey="ventas" name="Ventas" stroke="var(--color-brand)" strokeWidth={2.5}
          dot={{ fill: "var(--color-brand)", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
        <Line type="monotone" dataKey="utilidad" name="Utilidad" stroke="var(--color-accent)" strokeWidth={2.5}
          dot={{ fill: "var(--color-accent)", r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── Ventas vs Compras (barras agrupadas) ──────────────────────────────────────
export function BiVentasCompras() {
  return (
    <ResponsiveContainer height={260} width="100%">
      <BarChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={axisStyle} tickLine={false} axisLine={false} />
        <YAxis tick={axisStyle} tickLine={false} axisLine={false} tickFormatter={(v) => fmtK(v as number)} />
        <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} formatter={(v) => fmtK(Number(v))} />
        <Legend formatter={legendFormatter} />
        <Bar dataKey="ventas" name="Ventas" fill="var(--color-brand)" radius={[3, 3, 0, 0]} />
        <Bar dataKey="compras" name="Compras" fill="var(--color-info)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Categorías más rentables (donut) ──────────────────────────────────────────
export function BiCategoriasDonut() {
  const data = categoriasMasRentables.map((c) => ({ name: c.nombre, value: c.margen }));
  return (
    <ResponsiveContainer height={260} width="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={2}>
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} formatter={(v, n) => [`${v}%`, n as string]} />
        <Legend formatter={legendFormatter} />
      </PieChart>
    </ResponsiveContainer>
  );
}
