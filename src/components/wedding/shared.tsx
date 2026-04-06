import { useState, useEffect, useRef } from "react";

export const WEDDING_DATE = new Date("2026-08-14T14:00:00");

export const PHOTO_URL =
  "https://cdn.poehali.dev/projects/0a84e299-6d88-4d4e-87c5-8107f3b0b207/files/8d07f19d-a757-41e0-822d-f5e99f1ed8c5.jpg";

export const PROGRAM = [
  { time: "14:00", icon: "Heart", title: "Церемония", desc: "Торжественная регистрация брака" },
  { time: "15:30", icon: "Camera", title: "Фотосессия", desc: "Прогулка и памятные снимки" },
  { time: "17:00", icon: "UtensilsCrossed", title: "Банкет", desc: "Праздничный ужин и тосты" },
  { time: "19:00", icon: "Music", title: "Танцы", desc: "Живая музыка и дискотека" },
  { time: "23:00", icon: "Sparkles", title: "Фейерверк", desc: "Огненное шоу в финале вечера" },
];

export const DRESS_CODES = [
  { color: "#E8D5A3", name: "Шампань" },
  { color: "#F4A261", name: "Коралл" },
  { color: "#C8A96E", name: "Золото" },
  { color: "#8D6E63", name: "Терракот" },
  { color: "#4A4A4A", name: "Антрацит" },
];

export const NAV_LINKS = [
  { id: "about", label: "О паре" },
  { id: "program", label: "Программа" },
  { id: "location", label: "Локация" },
  { id: "dresscode", label: "Дресс-код" },
  { id: "rsvp", label: "Анкета" },
  { id: "contacts", label: "Контакты" },
];

export function useCountdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </div>
  );
}

export function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 8px 32px rgba(230,90,60,0.35)" }}
      >
        <span className="font-cormorant text-white text-4xl md:text-5xl font-bold leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "var(--c-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export function Divider() {
  return (
    <div className="flex items-center justify-center py-4 px-4">
      <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
      <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
      <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
    </div>
  );
}