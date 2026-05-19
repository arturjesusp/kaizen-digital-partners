"use client";

import { useState, useMemo, useEffect, useRef, Fragment, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useInView,
  useMotionValueEvent,
  animate,
} from "framer-motion";
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
type Lang = "EN" | "ES" | "FR" | "JP";

const copy = {
  EN: {
    nav: { cta: "REQUEST CONSULTATION" },
    hero: {
      eyebrow: "EST. 2021 · TORONTO",
      headline: "AI-Driven Digital Architecture for Enterprise",
      shimmerWord: "Growth",
      sub: "Bridging the gap between raw AI potential and tangible market results, structuring automated, scalable B2B ecosystems.",
      scroll: "Scroll to explore",
    },
    stack: { label: "—— CORE COMPETENCIES", title: "Digital Infrastructure" },
    metrics: [
      { n: "07", label: "Industries served" },
      { n: "41", label: "Systems shipped" },
      { n: "12", label: "Countries reached" },
      { n: "4",  label: "Languages" },
    ],
    services: {
      label: "—— SERVICES",
      title: "Engagements designed around outcomes, not deliverables.",
      items: [
        { n: "01", name: "AI Marketing Systems & Automation",   desc: "Composable marketing infrastructure that orchestrates personalization, lifecycle, and revenue intelligence at scale." },
        { n: "02", name: "Workflow & Process Optimization",     desc: "Re-architecting operational layers — eliminating friction, automating decisions, compounding throughput." },
        { n: "03", name: "Data Architecture & Scalability",     desc: "Production-grade pipelines, warehouses, and inference layers that scale with the business, not against it." },
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
    footer: { tag: "Headquartered in Toronto — Global Reach", rights: "All rights reserved." },
  },
  ES: {
    nav: { cta: "SOLICITAR CONSULTORÍA" },
    hero: {
      eyebrow: "FUNDADA EN 2021 · TORONTO",
      headline: "Arquitectura Digital Impulsada por IA para la",
      shimmerWord: "Crecimiento",
      sub: "Conectando el potencial de la IA con resultados tangibles de mercado, estructurando ecosistemas B2B automatizados y escalables.",
      scroll: "Desplázate para explorar",
    },
    stack: { label: "—— COMPETENCIAS CENTRALES", title: "Infraestructura Digital" },
    metrics: [
      { n: "07", label: "Industrias atendidas" },
      { n: "41", label: "Sistemas entregados" },
      { n: "12", label: "Países alcanzados" },
      { n: "4",  label: "Idiomas" },
    ],
    services: {
      label: "—— SERVICIOS",
      title: "Servicios diseñados en torno a resultados, no entregables.",
      items: [
        { n: "01", name: "Sistemas de Marketing con IA y Automatización", desc: "Infraestructura de marketing componible que orquesta personalización, ciclo de vida e inteligencia de ingresos a escala." },
        { n: "02", name: "Optimización de Flujos y Procesos",             desc: "Rearquitectura operativa — eliminamos fricción, automatizamos decisiones y multiplicamos el rendimiento." },
        { n: "03", name: "Arquitectura de Datos y Escalabilidad",         desc: "Pipelines, almacenes e inferencia listos para producción, que escalan con el negocio." },
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
    footer: { tag: "Sede en Toronto — Alcance Global", rights: "Todos los derechos reservados." },
  },
  FR: {
    nav: { cta: "DEMANDER UNE CONSULTATION" },
    hero: {
      eyebrow: "FONDÉE EN 2021 · TORONTO",
      headline: "Architecture Digitale Propulsée par l'IA pour la",
      shimmerWord: "Croissance",
      sub: "Combler le fossé entre le potentiel brut de l'IA et des résultats commerciaux tangibles, en structurant des écosystèmes B2B automatisés et évolutifs.",
      scroll: "Défiler pour explorer",
    },
    stack: { label: "—— COMPÉTENCES CLÉS", title: "Infrastructure Digitale" },
    metrics: [
      { n: "07", label: "Secteurs accompagnés" },
      { n: "41", label: "Systèmes déployés" },
      { n: "12", label: "Pays atteints" },
      { n: "4",  label: "Langues" },
    ],
    services: {
      label: "—— SERVICES",
      title: "Des engagements axés sur les résultats, pas sur les livrables.",
      items: [
        { n: "01", name: "Systèmes Marketing IA & Automatisation",  desc: "Infrastructure marketing composable orchestrant personnalisation, cycle de vie client et intelligence revenus à grande échelle." },
        { n: "02", name: "Optimisation des Flux & Processus",       desc: "Réarchitecturer les couches opérationnelles — éliminer les frictions, automatiser les décisions, démultiplier le débit." },
        { n: "03", name: "Architecture des Données & Évolutivité",  desc: "Pipelines, entrepôts et couches d'inférence prêts pour la production, qui évoluent avec l'entreprise." },
      ],
      learn: "Démarrer",
    },
    contact: {
      label: "—— ENGAGER UNE CONVERSATION",
      title: "Conçu pour un progrès mesurable.",
      sub: "Dites-nous où vous vous dirigez. Nous répondons sous un jour ouvrable.",
      email: "Email professionnel",
      company: "Entreprise",
      message: "Brièvement, que souhaitez-vous résoudre ?",
      submit: "Envoyer la demande",
    },
    footer: { tag: "Siège à Toronto — Portée Mondiale", rights: "Tous droits réservés." },
  },
  JP: {
    nav: { cta: "相談をリクエスト" },
    hero: {
      eyebrow: "2021年設立 · トロント",
      headline: "AI駆動型デジタルアーキテクチャで実現する",
      shimmerWord: "企業成長",
      sub: "AIの潜在能力と具体的なビジネス成果のギャップを埋め、自動化されたスケーラブルなB2Bエコシステムを構築します。",
      scroll: "スクロールして探索",
    },
    stack: { label: "—— コアコンピテンシー", title: "デジタルインフラ" },
    metrics: [
      { n: "07", label: "対応業種" },
      { n: "41", label: "導入済みシステム" },
      { n: "12", label: "展開国数" },
      { n: "4",  label: "対応言語" },
    ],
    services: {
      label: "—— サービス",
      title: "成果を中心に設計されたエンゲージメント。",
      items: [
        { n: "01", name: "AIマーケティングシステム＆自動化",         desc: "パーソナライゼーション、ライフサイクル管理、収益インテリジェンスを大規模にオーケストレートするマーケティングインフラ。" },
        { n: "02", name: "ワークフロー＆プロセス最適化",             desc: "オペレーショナルレイヤーを再設計し、摩擦を排除し、意思決定を自動化し、スループットを向上させます。" },
        { n: "03", name: "データアーキテクチャ＆スケーラビリティ",   desc: "ビジネスとともにスケールする本番環境対応のパイプライン、ウェアハウス、推論レイヤー。" },
      ],
      learn: "開始する",
    },
    contact: {
      label: "—— 対話を始める",
      title: "測定可能な進歩のために設計。",
      sub: "目標をお聞かせください。1営業日以内にご連絡いたします。",
      email: "会社メール",
      company: "会社名",
      message: "解決したい課題を簡潔にお聞かせください。",
      submit: "お問い合わせ送信",
    },
    footer: { tag: "カナダ・トロント本社 — グローバル展開", rights: "全著作権所有。" },
  },
} as const;

/* Interleaved so each pass alternates tech ↔ capability — gives visual rhythm */
const allTechs = [
  "NEXT.JS",
  "AUTOMATION SYSTEMS",
  "REACT",
  "STRATEGIC PLANNING",
  "TAILWIND CSS",
  "DATA ENGINEERING",
  "SUPABASE",
  "AI SOLUTION DESIGN",
  "VERCEL",
  "MULTILINGUAL (EN, ES, FR, JA)",
];

/* Sanzo Wada Vol. 2 — 4-tone sequential palette, assigned per unique tag position.
   Written as complete string literals so Tailwind's scanner picks up every class. */
const WADA_PILL_VARIANTS = [
  // Mustard / Ocre
  "hover:bg-[#cfa243]/20 hover:text-stone-900 hover:border-[#cfa243]/60 dark:hover:bg-[#cfa243]/30 dark:hover:text-white dark:hover:border-[#cfa243]/50",
  // Sage / Olive Green
  "hover:bg-[#8ba187]/20 hover:text-stone-900 hover:border-[#8ba187]/60 dark:hover:bg-[#8ba187]/30 dark:hover:text-white dark:hover:border-[#8ba187]/50",
  // Dusty Coral / Terra-cotta
  "hover:bg-[#c28d75]/20 hover:text-stone-900 hover:border-[#c28d75]/60 dark:hover:bg-[#c28d75]/30 dark:hover:text-white dark:hover:border-[#c28d75]/50",
  // Teal / Slate Blue
  "hover:bg-[#6b8f9e]/20 hover:text-stone-900 hover:border-[#6b8f9e]/60 dark:hover:bg-[#6b8f9e]/30 dark:hover:text-white dark:hover:border-[#6b8f9e]/50",
] as const;

const SERVICE_ICONS = [Sparkles, Workflow, Database] as const;

/* ──────────────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────────────── */
export default function KaizenLanding() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState<Lang>("EN");
  const [dotStep, setDotStep] = useState(0);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useMemo(() => copy[language], [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDarkMode]);

  useEffect(() => {
    const id = setInterval(() => setDotStep((n) => (n >= 3 ? 0 : n + 1)), 500);
    return () => clearInterval(id);
  }, []);

  const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "loading" || formState === "success") return;
    setFormState("loading");
    const data = new FormData(e.currentTarget);
    const payload = {
      email:   data.get("email")   as string,
      company: data.get("company") as string,
      message: data.get("message") as string,
    };
    if (!supabase) {
      console.log("[kaizen] Form submission (Supabase not configured):", payload);
      setFormState("success");
      (e.target as HTMLFormElement).reset();
      return;
    }
    try {
      const { error } = await supabase.from("inquiries").insert(payload);
      if (error) throw error;
      setFormState("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setFormState("error");
    }
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
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex items-center gap-2.5 mb-8"
                >
                  <motion.span
                    aria-hidden
                    className="block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"
                    animate={{ opacity: [1, 0.25, 1] }}
                    transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
                  />
                  <span className="text-[11px] tracking-[0.3em] font-medium text-zinc-500 dark:text-zinc-400">
                    {t.hero.eyebrow}
                  </span>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={language + "-h1"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.02] tracking-[-0.02em] font-medium max-w-5xl"
                  >
                    {t.hero.headline}{" "}
                    <span className="shimmer-text">{t.hero.shimmerWord}</span>
                    {/* Fixed-width container sized to "..." so layout never shifts.
                        The invisible "..." ghost holds the space; the real dots sit on top. */}
                    <span className="inline-block align-baseline relative" aria-hidden="true">
                      <span className="invisible" aria-hidden="true">...</span>
                      <span className="absolute inset-0 text-zinc-500 dark:text-zinc-300">
                        {".".repeat(dotStep)}
                      </span>
                    </span>
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
              {t.metrics.map(({ n, label }) => (
                <div key={n} className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl tracking-tight">
                    <AnimatedNumber n={n} />
                  </span>
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
          {/* Centered header */}
          <div className="text-center mb-14 md:mb-20 px-6">
            <AnimatePresence mode="wait">
              <motion.h2
                key={language + "-stack-title"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-tight"
              >
                {t.stack.title}
              </motion.h2>
            </AnimatePresence>
            <p className="mt-3 text-[11px] tracking-[0.35em] font-medium text-zinc-500 dark:text-zinc-400 uppercase">
              {`-- ${t.stack.label.replace(/^—+\s*/, "")} --`}
            </p>
          </div>

          <Marquee />
        </section>

        {/* ───────── Services Grid ───────── */}
        <section
          id="services"
          className="relative py-24 md:py-32 border-b border-zinc-200 dark:border-zinc-800"
        >
          <div className="px-6 md:px-10 lg:px-16">
            <div className="mb-16 md:mb-24 text-center">
              <p className="text-[11px] tracking-[0.35em] font-medium text-zinc-500 dark:text-zinc-400 uppercase mb-5">
                {t.services.label}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-tight max-w-4xl mx-auto">
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
                className="lg:col-span-7 flex flex-col gap-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField name="email"   type="email" required label={t.contact.email}   />
                  <FormField name="company" type="text"  required label={t.contact.company} />
                </div>
                <FormField name="message" type="text" required label={t.contact.message} textarea />

                <div className="flex items-center justify-between pt-1 gap-4">
                  {/* Inline status feedback */}
                  <AnimatePresence mode="wait">
                    {formState === "success" && (
                      <motion.p
                        key="success"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs tracking-wide text-emerald-500"
                      >
                        {language === "JP" ? "お問い合わせを受け付けました。" :
                         language === "FR" ? "Demande reçue — nous reviendrons vers vous." :
                         language === "ES" ? "Consulta recibida — estaremos en contacto." :
                         "Inquiry received — we'll be in touch."}
                      </motion.p>
                    )}
                    {formState === "error" && (
                      <motion.p
                        key="error"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs tracking-wide text-rose-400"
                      >
                        {language === "JP" ? "エラーが発生しました。再度お試しください。" :
                         language === "FR" ? "Une erreur s'est produite. Veuillez réessayer." :
                         language === "ES" ? "Algo salió mal. Por favor intenta de nuevo." :
                         "Something went wrong. Please try again."}
                      </motion.p>
                    )}
                    {(formState === "idle" || formState === "loading") && (
                      <span key="spacer" />
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={formState === "loading" || formState === "success"}
                    className="group inline-flex items-center gap-3 rounded-full border border-zinc-900 dark:border-zinc-50 px-7 py-3 text-xs tracking-[0.25em] font-semibold uppercase text-zinc-900 dark:text-zinc-50 hover:bg-zinc-900 hover:text-stone-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-950 disabled:opacity-40 disabled:pointer-events-none transition-colors duration-300 whitespace-nowrap"
                  >
                    {formState === "loading" ? (
                      <span className="inline-flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block h-3 w-3 rounded-full border border-current border-t-transparent"
                        />
                        <span>{language === "JP" ? "送信中..." : language === "FR" ? "Envoi..." : language === "ES" ? "Enviando..." : "Sending..."}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t.contact.submit}</span>
                        <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
                      </>
                    )}
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
          {/* Theme toggle — transparent circle, border breathes between light/dark poles */}
          <motion.button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-10 w-10 inline-flex items-center justify-center rounded-full border-[1px] bg-transparent"
            animate={{
              borderColor: isDarkMode
                ? ["#ffffff", "#1c1917", "#ffffff"]
                : ["#0c0a09", "#e7e5e4", "#0c0a09"],
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.span
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex text-zinc-50"
                >
                  <Moon className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="sun"
                  initial={{ rotate:  90, opacity: 0 }}
                  animate={{ rotate:   0, opacity: 1 }}
                  exit={{    rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex text-zinc-900"
                >
                  <Sun className="h-4 w-4" strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Language */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest font-medium select-none">
            {(["EN", "ES", "FR", "JP"] as const).map((lang, i) => (
              <Fragment key={lang}>
                {i > 0 && (
                  <span className="text-zinc-300 dark:text-zinc-700" aria-hidden>|</span>
                )}
                <button
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`transition-colors duration-200 ${
                    language === lang
                      ? "font-bold text-zinc-900 dark:text-zinc-50"
                      : "text-stone-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
                  }`}
                >
                  {lang}
                </button>
              </Fragment>
            ))}
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
   Marquee — single-row infinite scroll, triple-buffered for zero-gap math.
   Tripling → animate to -33.3333% moves exactly one copy-length seamlessly.
   Each pill uses Framer Motion whileHover for per-element glow micro-interaction
   without touching the parent's continuous x animation.
   ────────────────────────────────────────────────────────────────────────── */
function Marquee() {
  const tripled = [...allTechs, ...allTechs, ...allTechs];

  return (
    <div className="w-full overflow-hidden select-none relative py-6 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
      <motion.div
        className="flex flex-nowrap gap-6 w-max font-mono text-xs uppercase tracking-widest"
        animate={{ x: [0, "-33.3333%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
      >
        {tripled.map((tag, i) => {
          const hover = WADA_PILL_VARIANTS[(i % allTechs.length) % WADA_PILL_VARIANTS.length];
          return (
            <span
              key={`${tag}-${i}`}
              className={`inline-flex items-center px-5 py-2.5 rounded-full whitespace-nowrap cursor-default transition-all duration-300 ease-in-out bg-stone-50 border border-stone-200/60 text-stone-600 dark:bg-stone-900/40 dark:border-stone-800/80 dark:text-stone-400 ${hover}`}
            >
              {tag}
            </span>
          );
        })}
      </motion.div>
    </div>
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
      className={`group relative bg-stone-100 dark:bg-zinc-900/70 rounded-2xl px-5 py-4 flex flex-col gap-2 cursor-text border border-transparent transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 ${className}`}
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

/* ──────────────────────────────────────────────────────────────────────────
   AnimatedNumber
   Counts from 0 → target the first time the element enters the viewport.
   Preserves leading-zero padding ("07" stays "07" through the count).
   Prefix/suffix chars ("+", "%", "k") are rendered statically so the
   layout never shifts as the numeric portion changes width.
   ────────────────────────────────────────────────────────────────────────── */
function AnimatedNumber({ n }: { n: string }) {
  const match  = n.match(/^([^\d]*)(\d+)([^\d]*)$/);
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? n;
  const suffix = match?.[3] ?? "";
  const target = parseInt(digits, 10);
  const padLen = digits.length > 1 && digits.startsWith("0") ? digits.length : 0;

  const ref      = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count    = useMotionValue(0);
  const [display, setDisplay] = useState(
    padLen > 0 ? "0".padStart(padLen, "0") : "0"
  );

  useMotionValueEvent(count, "change", (latest) => {
    const r = Math.round(latest);
    setDisplay(padLen > 0 ? String(r).padStart(padLen, "0") : String(r));
  });

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(count, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    return ctrl.stop;
  }, [isInView, count, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}
