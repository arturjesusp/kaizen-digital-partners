"use client";

import { useState, useMemo, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Workflow,
  Database,
  Send,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   i18n dictionary — flat, explicit, no abstractions.
   ────────────────────────────────────────────────────────────────────────── */
type Lang = "EN" | "ES";

const copy = {
  EN: {
    nav: {
      cta: "REQUEST CONSULTATION",
    },
    hero: {
      eyebrow: "EST. 2021 · TORONTO",
      headline: "AI-Driven Digital Architecture for Enterprise Growth.",
      sub: "Bridging the gap between raw AI potential and tangible market results, structuring automated, scalable B2B ecosystems.",
      scroll: "Scroll to explore",
    },
    stack: {
      label: "—— CORE COMPETENCIES",
      title: "Expertise Stack",
    },
    services: {
      label: "—— SERVICES",
      title: "Engagements designed around outcomes, not deliverables.",
      items: [
        {
          n: "01",
          name: "AI Marketing Systems & Automation",
          desc: "Composable marketing infrastructure that orchestrates personalization, lifecycle, and revenue intelligence at scale.",
        },
        {
          n: "02",
          name: "Workflow & Process Optimization",
          desc: "Re-architecting operational layers — eliminating friction, automating decisions, compounding throughput.",
        },
        {
          n: "03",
          name: "Data Architecture & Scalability",
          desc: "Production-grade pipelines, warehouses, and inference layers that scale with the business, not against it.",
        },
      ],
      learn: "Engage",
    },
    contact: {
      label: "—— BEGIN A CONVERSATION",
      title: "Engineered for measured progress.",
      sub: "Tell us where you're headed. We'll respond within one business day.",
      email: "Work email",
      company: "Company",
      message: "Briefly, what are you trying to solve?",
      submit: "Submit inquiry",
    },
    footer: {
      tag: "Headquartered in Toronto — Global Reach",
      rights: "All rights reserved.",
    },
  },
  ES: {
    nav: {
      cta: "SOLICITAR CONSULTORÍA",
    },
    hero: {
      eyebrow: "FUNDADA EN 2021 · TORONTO",
      headline: "Arquitectura Digital Impulsada por IA para el Crecimiento Empresarial.",
      sub: "Conectando el potencial de la IA con resultados tangibles de mercado, estructurando ecosistemas B2B automatizados y escalables.",
      scroll: "Desplázate para explorar",
    },
    stack: {
      label: "—— COMPETENCIAS CENTRALES",
      title: "Stack de Especialización",
    },
    services: {
      label: "—— SERVICIOS",
      title: "Servicios diseñados en torno a resultados, no entregables.",
      items: [
        {
          n: "01",
          name: "Sistemas de Marketing con IA y Automatización",
          desc: "Infraestructura de marketing componible que orquesta personalización, ciclo de vida e inteligencia de ingresos a escala.",
        },
        {
          n: "02",
          name: "Optimización de Flujos y Procesos",
          desc: "Rearquitectura operativa — eliminamos fricción, automatizamos decisiones y multiplicamos el rendimiento.",
        },
        {
          n: "03",
          name: "Arquitectura de Datos y Escalabilidad",
          desc: "Pipelines, almacenes e inferencia listos para producción, que escalan con el negocio.",
        },
      ],
      learn: "Iniciar",
    },
    contact: {
      label: "—— INICIA UNA CONVERSACIÓN",
      title: "Diseñado para el progreso medido.",
      sub: "Cuéntanos hacia dónde te diriges. Respondemos en menos de un día hábil.",
      email: "Correo corporativo",
      company: "Empresa",
      message: "Brevemente, ¿qué buscas resolver?",
      submit: "Enviar consulta",
    },
    footer: {
      tag: "Sede en Toronto — Alcance Global",
      rights: "Todos los derechos reservados.",
    },
  },
} as const;

const STACK = [
  "NEXT.JS",
  "REACT",
  "TAILWIND CSS",
  "SUPABASE",
  "VERCEL",
  "AUTOMATION SYSTEMS",
  "STRATEGIC PLANNING",
  "DATA ENGINEERING",
  "AI SOLUTION DESIGN",
  "MULTILINGUAL (EN, ES, FR, JA)",
];

const SERVICE_ICONS = [Sparkles, Workflow, Database] as const;

/* ──────────────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────────────── */
export default function KaizenLanding() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Lang>("EN");
  const t = useMemo(() => copy[language], [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDarkMode]);

  // Future Supabase wiring — currently a no-op stub.
  const handleLeadSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form = new FormData(e.currentTarget);
    // await supabase.from('leads').insert({ ... })
  };

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-900 selection:bg-zinc-900 selection:text-stone-50 dark:bg-zinc-950 dark:text-zinc-50 dark:selection:bg-zinc-50 dark:selection:text-zinc-950 transition-colors duration-500">
      {/* ───────── Header ───────── */}
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        ctaLabel={t.nav.cta}
      />

      <main>
        {/* ───────── Hero ───────── */}
        <section
          id="hero"
          className="relative min-h-[88vh] flex items-end overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
        >
          {/* Architectural grid overlay */}
          <GridOverlay />

          <div className="relative w-full px-6 md:px-10 lg:px-16 pt-40 pb-20 md:pt-48 md:pb-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-9">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[11px] tracking-[0.3em] font-medium text-zinc-500 dark:text-zinc-400 mb-8"
                >
                  {t.hero.eyebrow}
                </motion.p>

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={language + "-h1"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-[-0.02em] font-medium max-w-5xl"
                  >
                    {t.hero.headline}
                  </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={language + "-sub"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="mt-8 md:mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    {t.hero.sub}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="lg:col-span-3 flex lg:justify-end items-end">
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  <span className="font-medium">{t.hero.scroll}</span>
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                </motion.a>
              </div>
            </div>

            {/* Bottom metric strip — Danshari: a single, restrained anchor */}
            <div className="mt-20 md:mt-28 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
              {[
                ["07", language === "EN" ? "Industries served" : "Industrias"],
                ["41", language === "EN" ? "Systems shipped" : "Sistemas entregados"],
                ["12", language === "EN" ? "Countries reached" : "Países alcanzados"],
                ["4", language === "EN" ? "Languages" : "Idiomas"],
              ].map(([n, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl tracking-tight">{n}</span>
                  <span className="mt-2 text-[10px] tracking-[0.25em] uppercase text-zinc-500 dark:text-zinc-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Core Competencies (marquee) ───────── */}
        <section
          id="stack"
          className="relative py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <p className="md:col-span-3 text-[11px] tracking-[0.3em] font-medium text-zinc-500 dark:text-zinc-400">
                {t.stack.label}
              </p>
              <h2 className="md:col-span-9 font-serif text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-tight max-w-3xl">
                {t.stack.title}
              </h2>
            </div>
          </div>

          {/* Edge-to-edge marquee */}
          <div className="relative w-full overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-stone-50 to-transparent dark:from-zinc-950" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-stone-50 to-transparent dark:from-zinc-950" />

            <div className="flex w-max animate-marquee gap-3">
              {[...STACK, ...STACK].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-950 px-5 py-2.5 text-xs tracking-widest font-semibold uppercase text-zinc-700 dark:text-zinc-300 transition-transform duration-300 hover:scale-105 hover:border-zinc-900 dark:hover:border-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Static, hoverable grid below — for accessibility / keyboard nav */}
          <div className="mt-14 px-6 md:px-10 lg:px-16 flex flex-wrap gap-3">
            {STACK.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-xs tracking-widest font-semibold uppercase text-zinc-700 dark:text-zinc-300 hover:border-zinc-900 dark:hover:border-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 cursor-default transition-colors"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </section>

        {/* ───────── Services Grid ───────── */}
        <section
          id="services"
          className="relative py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
              <p className="md:col-span-3 text-[11px] tracking-[0.3em] font-medium text-zinc-500 dark:text-zinc-400">
                {t.services.label}
              </p>
              <h2 className="md:col-span-9 font-serif text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-tight max-w-4xl">
                {t.services.title}
              </h2>
            </div>

            {/* Asymmetrical grid: spans differently per row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
              {t.services.items.map((item, idx) => {
                const Icon = SERVICE_ICONS[idx] ?? Sparkles;
                const spans = [
                  "md:col-span-7",
                  "md:col-span-5",
                  "md:col-span-12",
                ];
                return (
                  <ServiceCard
                    key={item.n}
                    className={spans[idx] ?? "md:col-span-6"}
                    icon={<Icon className="h-5 w-5" strokeWidth={1.5} />}
                    number={item.n}
                    name={item.name}
                    desc={item.desc}
                    cta={t.services.learn}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── Lead Capture ───────── */}
        <section id="contact" className="py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                <p className="text-[11px] tracking-[0.3em] font-medium text-zinc-500 dark:text-zinc-400 mb-6">
                  {t.contact.label}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-tight">
                  {t.contact.title}
                </h2>
                <p className="mt-6 text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                  {t.contact.sub}
                </p>
              </div>

              <form
                onSubmit={handleLeadSubmit}
                className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
              >
                <FormField name="email" type="email" required label={t.contact.email} />
                <FormField name="company" type="text" required label={t.contact.company} />
                <FormField
                  name="message"
                  type="text"
                  required
                  label={t.contact.message}
                  className="sm:col-span-2"
                  textarea
                />
                <div className="sm:col-span-2 bg-stone-50 dark:bg-zinc-950 p-6 md:p-8 flex items-center justify-end">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 border border-zinc-900 dark:border-zinc-50 px-6 py-3 text-xs tracking-[0.25em] font-semibold uppercase text-zinc-900 dark:text-zinc-50 hover:bg-zinc-900 hover:text-stone-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors duration-300"
                  >
                    <span>{t.contact.submit}</span>
                    <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ───────── Footer ───────── */}
      <footer className="py-12 md:py-16 px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs tracking-[0.25em] uppercase font-medium text-zinc-600 dark:text-zinc-400">
              {t.footer.tag}
            </p>
          </div>
          <p className="text-xs tracking-wide text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Kaizen Digital Partners. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Header
   ────────────────────────────────────────────────────────────────────────── */
function Header({
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  ctaLabel,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  language: Lang;
  setLanguage: (v: Lang) => void;
  ctaLabel: string;
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-50/70 dark:bg-zinc-950/60 border-b border-zinc-200/70 dark:border-zinc-800/70">
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 h-16 md:h-20">
        {/* Brand */}
        <a
          href="#hero"
          className="font-serif font-bold tracking-[0.18em] text-[13px] md:text-sm uppercase whitespace-nowrap"
        >
          Kaizen Digital Partners
        </a>

        {/* Controls */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Theme toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative h-9 w-9 inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-50 transition-colors overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  <Moon className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  <Sun className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Language */}
          <div className="hidden sm:flex items-center gap-2 text-xs tracking-widest font-medium select-none">
            <motion.button
              type="button"
              layout
              onClick={() => setLanguage("EN")}
              className={`transition-all ${
                language === "EN"
                  ? "font-bold text-zinc-900 dark:text-zinc-50"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              EN
            </motion.button>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <motion.button
              type="button"
              layout
              onClick={() => setLanguage("ES")}
              className={`transition-all ${
                language === "ES"
                  ? "font-bold text-zinc-900 dark:text-zinc-50"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              ES
            </motion.button>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 border border-zinc-900 dark:border-zinc-50 px-4 py-2 text-[10px] md:text-[11px] tracking-[0.25em] font-semibold uppercase hover:bg-zinc-900 hover:text-stone-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-950 transition-colors duration-300"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Architectural grid overlay (decorative, behind hero)
   ────────────────────────────────────────────────────────────────────────── */
function GridOverlay() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none opacity-[0.35] dark:opacity-[0.25]"
    >
      <div className="absolute inset-0 grid grid-cols-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`border-l border-zinc-200 dark:border-zinc-800 ${
              i === 11 ? "border-r" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ServiceCard
   ────────────────────────────────────────────────────────────────────────── */
function ServiceCard({
  number,
  name,
  desc,
  icon,
  cta,
  className = "",
}: {
  number: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  cta: string;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={`group relative bg-stone-50 dark:bg-zinc-950 p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[340px] transition-colors duration-500 hover:bg-stone-100 dark:hover:bg-zinc-900 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-zinc-500 dark:text-zinc-400">
            {number}
          </span>
          <span className="h-px w-8 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
            {icon}
          </span>
        </div>
        <ArrowUpRight
          className="h-5 w-5 text-zinc-400 dark:text-zinc-600 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-all duration-300"
          strokeWidth={1.5}
        />
      </div>

      <div className="mt-8">
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] leading-[1.1] max-w-md">
          {name}
        </h3>
        <p className="mt-5 text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg">
          {desc}
        </p>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
        <span>{cta}</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   FormField
   ────────────────────────────────────────────────────────────────────────── */
function FormField({
  name,
  type,
  label,
  required,
  className = "",
  textarea = false,
}: {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  className?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full bg-transparent text-sm md:text-base outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50";

  return (
    <label
      className={`group relative bg-stone-50 dark:bg-zinc-950 p-6 md:p-8 flex flex-col gap-3 cursor-text transition-colors hover:bg-stone-100/60 dark:hover:bg-zinc-900/60 ${className}`}
    >
      <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          className={base + " resize-none"}
        />
      ) : (
        <input name={name} type={type} required={required} className={base} />
      )}
    </label>
  );
}
