"use client";

import { useMemo, useState } from "react";

type Product = {
  id: string;
  nombre: string;
  detalle: string;
  valor: string; // formatted currency label: "$ 0.00"
};

function countLabel(count: number) {
  if (count === 1) return "0 Artículos registrados";
  return `${count} Artículos registrados`;
}

function formatMoneyNumber(n: number) {
  return n.toFixed(2);
}

function parseMoneyNumber(value: string) {
  const cleaned = value.replace(/[^0-9.\-]/g, "");
  const num = Number.parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function sanitizeMoneyNumberInput(value: string) {
  // Allow only digits and a single decimal point.
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [intPart, ...rest] = cleaned.split(".");
  const frac = rest.join("");
  if (rest.length === 0) return intPart;
  return `${intPart}.${frac}`;
}

function moneyLabelFromNumber(n: number) {
  return `$ ${formatMoneyNumber(n)}`;
}

function UpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function DownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" />
      <path d="M3.3 7.6 12 12l8.7-4.4" />
      <path d="M12 22V12" />
    </svg>
  );
}

export default function Home() {
  const [nombre, setNombre] = useState<string>("");
  const [detalle, setDetalle] = useState<string>("");
  const [valorNumero, setValorNumero] = useState<string>("0.00");
  const [products, setProducts] = useState<Product[]>([]);

  const articulosRegistrados = useMemo(() => products.length, [products]);

  function handleAdjustValor(delta: number) {
    const current = parseMoneyNumber(valorNumero);
    const next = Math.max(0, current + delta);
    setValorNumero(formatMoneyNumber(next));
  }

  function handleAddProduct() {
    const nextNombre = nombre.trim();
    const nextDetalle = detalle.trim();
    const nextValorNumber = parseMoneyNumber(valorNumero);

    if (!nextNombre || !nextDetalle) return;

    const nextProduct: Product = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      nombre: nextNombre,
      detalle: nextDetalle,
      valor: moneyLabelFromNumber(nextValorNumber),
    };

    setProducts((prev) => [nextProduct, ...prev]);
    setNombre("");
    setDetalle("");
    setValorNumero("0.00");
  }

  function handleRemoveProduct(id: string) {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="mx-auto flex max-w-6xl items-center px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 grid-cols-2 gap-1 rounded-md bg-orange-50 p-1">
            <div className="rounded-sm bg-orange-500" />
            <div className="rounded-sm bg-orange-500/80" />
            <div className="rounded-sm bg-orange-500/80" />
            <div className="rounded-sm bg-orange-500/90" />
          </div>
          <div className="text-sm font-semibold text-gray-800">
            AchieversApp
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h1 className="text-sm font-semibold text-gray-900">
                Registrar Producto
              </h1>
              <p className="text-xs leading-relaxed text-gray-500">
                Ingresa los detalles para añadir un nuevo artículo al catálogo.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="productName"
                  className="text-xs font-medium text-gray-700"
                >
                  Nombre del producto
                </label>
                <input
                  id="productName"
                  name="productName"
                  placeholder="Ej. Computadora portátil"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-orange-300 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="productDetail"
                  className="text-xs font-medium text-gray-700"
                >
                  Detalle
                </label>
                <textarea
                  id="productDetail"
                  name="productDetail"
                  rows={4}
                  placeholder="Describe las características principales..."
                  value={detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                  className="w-full resize-none rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-orange-300 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="productValue"
                  className="text-xs font-medium text-gray-700"
                >
                  Valor
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-gray-400">
                    $
                  </span>
                  <input
                    id="productValue"
                    name="productValue"
                    inputMode="decimal"
                    value={valorNumero}
                    onChange={(e) =>
                      setValorNumero(sanitizeMoneyNumberInput(e.target.value))
                    }
                    className="w-full rounded-lg bg-gray-50 py-3 pl-9 pr-14 text-sm text-gray-900 outline-none ring-1 ring-gray-200 transition focus:ring-2 focus:ring-orange-300 focus:shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
                    placeholder="0.00"
                  />

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleAdjustValor(+1)}
                      aria-label="Aumentar valor"
                      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      <UpIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdjustValor(-1)}
                      aria-label="Disminuir valor"
                      className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      <DownIcon />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <span className="mr-2">+</span> Agregar Producto
              </button>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-50 p-8 shadow-sm ring-1 ring-gray-100 md:py-10">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-gray-900">
                Vitrina de Productos
              </h2>
              <p className="text-xs text-gray-500">
                {articulosRegistrados === 0
                  ? "0 Artículos registrados"
                  : `${articulosRegistrados} Artículos registrados`}
              </p>
            </div>

            <div className="mt-14 flex min-h-[420px] items-center justify-center">
              {products.length === 0 ? (
                <div className="max-w-xs text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <CubeIcon />
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    Tu catálogo está vacío
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                    Registra tu primer producto en el panel izquierdo para
                    verlo aparecer aquí instantáneamente.
                  </p>
                </div>
              ) : (
                <div className="w-full space-y-3">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-gray-100 bg-white/80 p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-gray-900">
                            {p.nombre}
                          </div>
                          <div className="mt-1 break-words text-sm text-gray-600">
                            {p.detalle}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">
                              {p.valor}
                            </div>
                            <div className="mt-1 text-[11px] text-gray-500">
                              Valor
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(p.id)}
                            className="text-[11px] font-medium text-gray-400 underline underline-offset-2 transition hover:text-orange-500 focus:outline-none focus:text-orange-500"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Tu Nombre Completo - Grupo
        </footer>
      </main>
    </div>
  );
}
