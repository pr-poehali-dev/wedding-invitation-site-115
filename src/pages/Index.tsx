import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2026-08-14T14:00:00");

function useCountdown() {
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

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 8px 32px rgba(230,90,60,0.35)" }}>
        <span className="font-cormorant text-white text-4xl md:text-5xl font-bold leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-montserrat text-xs uppercase tracking-widest" style={{ color: "var(--c-muted)" }}>{label}</span>
    </div>
  );
}

const PROGRAM = [
  { time: "14:00", icon: "Heart", title: "Церемония", desc: "Торжественная регистрация брака" },
  { time: "15:30", icon: "Camera", title: "Фотосессия", desc: "Прогулка и памятные снимки" },
  { time: "17:00", icon: "UtensilsCrossed", title: "Банкет", desc: "Праздничный ужин и тосты" },
  { time: "19:00", icon: "Music", title: "Танцы", desc: "Живая музыка и дискотека" },
  { time: "23:00", icon: "Sparkles", title: "Фейерверк", desc: "Огненное шоу в финале вечера" },
];

const DRESS_CODES = [
  { color: "#E8D5A3", name: "Шампань" },
  { color: "#F4A261", name: "Коралл" },
  { color: "#C8A96E", name: "Золото" },
  { color: "#8D6E63", name: "Терракот" },
  { color: "#4A4A4A", name: "Антрацит" },
];

export default function Index() {
  const countdown = useCountdown();
  const [form, setForm] = useState({ name: "", attending: "", drink: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeNav, setActiveNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { id: "about", label: "О паре" },
    { id: "program", label: "Программа" },
    { id: "location", label: "Локация" },
    { id: "dresscode", label: "Дресс-код" },
    { id: "rsvp", label: "Анкета" },
    { id: "contacts", label: "Контакты" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map(l => document.getElementById(l.id));
      const current = sections.findLast(s => s && s.getBoundingClientRect().top < 120);
      setActiveNav(current?.id || "");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "var(--c-bg)", color: "var(--c-text)", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ background: "rgba(253,248,243,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(184,131,42,0.2)" }}
        className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-cormorant italic text-lg tracking-wide" style={{ color: "var(--c-gold)" }}>
            Д & Е
          </button>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="font-montserrat text-xs uppercase tracking-widest transition-colors duration-200"
                style={{ color: activeNav === l.id ? "var(--c-gold)" : "var(--c-muted)" }}>
                {l.label}
              </button>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--c-gold)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ background: "rgba(253,248,243,0.98)" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                className="text-left font-montserrat text-xs uppercase tracking-widest py-2"
                style={{ color: "var(--c-text)" }}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ paddingTop: 56 }}>
        <div className="absolute inset-0 z-0">
          <img src="https://cdn.poehali.dev/projects/0a84e299-6d88-4d4e-87c5-8107f3b0b207/files/8d07f19d-a757-41e0-822d-f5e99f1ed8c5.jpg"
            alt="Wedding" className="w-full h-full object-cover" style={{ filter: "brightness(0.45)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(253,248,243,0.15) 0%, rgba(253,248,243,0.45) 60%, rgba(253,248,243,1) 100%)" }} />
        </div>

        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
              background: `rgba(230,170,80,${0.2 + (i % 5) * 0.1})`,
              left: `${(i * 11) % 100}%`, top: `${(i * 17) % 100}%`,
              animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i % 4) * 0.7}s`,
            }} />
        ))}

        <div className="relative z-10 text-center px-4 animate-fade-in">
          <p className="font-montserrat text-xs uppercase tracking-[0.4em] mb-6" style={{ color: "var(--c-gold)", opacity: 0.9 }}>
            Вы приглашены на свадьбу
          </p>
          <h1 className="font-cormorant italic leading-none mb-4" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "var(--c-text)" }}>
            Дмитрий<br />
            <span style={{ color: "var(--c-gold)" }}>&</span><br />
            Елена
          </h1>
          <div className="flex items-center justify-center gap-4 my-8">
            <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, var(--c-gold))" }} />
            <span className="font-montserrat text-sm tracking-[0.3em] uppercase" style={{ color: "var(--c-gold)" }}>14 августа 2026</span>
            <div style={{ height: 1, width: 60, background: "linear-gradient(to left, transparent, var(--c-gold))" }} />
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-6 mt-10">
            <CountdownBlock value={countdown.days} label="Дней" />
            <span className="font-cormorant text-4xl mb-6" style={{ color: "var(--c-gold)" }}>:</span>
            <CountdownBlock value={countdown.hours} label="Часов" />
            <span className="font-cormorant text-4xl mb-6" style={{ color: "var(--c-gold)" }}>:</span>
            <CountdownBlock value={countdown.minutes} label="Минут" />
            <span className="font-cormorant text-4xl mb-6" style={{ color: "var(--c-gold)" }}>:</span>
            <CountdownBlock value={countdown.seconds} label="Секунд" />
          </div>

          <button onClick={() => scrollTo("rsvp")} className="mt-12 px-10 py-4 font-montserrat text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", borderRadius: 2, boxShadow: "0 8px 32px rgba(230,90,60,0.4)" }}>
            Подтвердить участие
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={28} style={{ color: "var(--c-muted)" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>Наша история</p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>О нас</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="font-cormorant text-2xl italic leading-relaxed" style={{ color: "var(--c-text)", opacity: 0.9 }}>
                «Любовь — это не то, что ты ищешь. Это то, что находит тебя»
              </p>
              <p className="font-montserrat text-sm leading-loose" style={{ color: "var(--c-muted)" }}>
                Дмитрий и Елена встретились несколько лет назад и с тех пор ни на секунду не сомневались — это судьба. Их история полна смеха, путешествий и взаимной поддержки.
              </p>
              <p className="font-montserrat text-sm leading-loose" style={{ color: "var(--c-muted)" }}>
                14 августа 2026 года они официально скажут «да» в окружении самых близких и дорогих людей. И вы — среди них.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden" style={{ boxShadow: "0 24px 80px rgba(44,24,16,0.15)" }}>
                <img src="https://cdn.poehali.dev/projects/0a84e299-6d88-4d4e-87c5-8107f3b0b207/files/8d07f19d-a757-41e0-822d-f5e99f1ed8c5.jpg"
                  alt="Пара" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 12px 40px rgba(230,90,60,0.4)" }}>
                <span className="font-cormorant text-4xl font-bold text-white">14</span>
                <span className="font-montserrat text-xs text-white uppercase tracking-wider">Августа</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <div className="flex items-center justify-center py-4 px-4">
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
        <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
      </div>

      {/* PROGRAM */}
      <section id="program" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>День торжества</p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Программа</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[50%] top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)", opacity: 0.4 }} />
            <div className="space-y-8">
              {PROGRAM.map((item, i) => (
                <div key={i} className={`flex items-center gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="inline-block px-6 py-5 rounded-2xl transition-transform duration-300 hover:scale-105"
                      style={{ background: "var(--c-card)", border: "1px solid rgba(184,131,42,0.2)", boxShadow: "0 8px 32px rgba(44,24,16,0.08)" }}>
                      <p className="font-montserrat text-xs uppercase tracking-widest mb-1" style={{ color: "var(--c-coral)" }}>{item.time}</p>
                      <h3 className="font-cormorant text-2xl mb-1" style={{ color: "var(--c-text)" }}>{item.title}</h3>
                      <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 0 0 6px rgba(230,170,80,0.1)" }}>
                      <Icon name={item.icon} fallback="Star" size={22} style={{ color: "#fff" }} />
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <div className="flex items-center justify-center py-4 px-4">
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
        <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
      </div>

      {/* LOCATION */}
      <section id="location" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>Где нас найти</p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Локация</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="p-8 rounded-3xl" style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}>
                  <Icon name="MapPin" size={22} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl mb-1" style={{ color: "var(--c-text)" }}>Ресторан «Дворянское гнездо»</h3>
                  <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>г. Москва, ул. Тверская, 15</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={16} style={{ color: "var(--c-gold)" }} />
                  <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Начало в 14:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Car" size={16} style={{ color: "var(--c-gold)" }} />
                  <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Парковка для гостей — бесплатно</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Train" size={16} style={{ color: "var(--c-gold)" }} />
                  <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Метро: Тверская, 5 мин. пешком</span>
                </div>
              </div>
              <a href="https://maps.yandex.ru" target="_blank" rel="noopener"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", textDecoration: "none" }}>
                <Icon name="Navigation" size={16} />
                Открыть на карте
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden flex items-center justify-center"
              style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)", minHeight: 280 }}>
              <div className="text-center p-8">
                <Icon name="Map" size={48} style={{ color: "var(--c-gold)", opacity: 0.4 }} />
                <p className="font-montserrat text-sm mt-4" style={{ color: "var(--c-muted)" }}>Карта будет добавлена позже</p>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <div className="flex items-center justify-center py-4 px-4">
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
        <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
      </div>

      {/* DRESS CODE */}
      <section id="dresscode" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>Внешний вид</p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Дресс-код</h2>
          </div>
          <div className="p-8 md:p-12 rounded-3xl" style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}>
            <p className="font-montserrat text-sm leading-loose text-center mb-10" style={{ color: "var(--c-muted)" }}>
              Мы будем рады видеть гостей в элегантных нарядах тёплой цветовой гаммы.<br />
              Пожалуйста, избегайте белого и чёрного цветов.
            </p>
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {DRESS_CODES.map((dc, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: dc.color, boxShadow: `0 8px 24px ${dc.color}60` }} />
                  <span className="font-montserrat text-xs uppercase tracking-wider" style={{ color: "var(--c-muted)" }}>{dc.name}</span>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(230,90,60,0.08)", border: "1px solid rgba(230,90,60,0.15)" }}>
                <Icon name="CheckCircle" size={20} style={{ color: "var(--c-coral)" }} />
                <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Вечерние платья и костюмы приветствуются</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(230,90,60,0.08)", border: "1px solid rgba(230,90,60,0.15)" }}>
                <Icon name="XCircle" size={20} style={{ color: "var(--c-coral)" }} />
                <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Белый и чёрный цвета просим не выбирать</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <div className="flex items-center justify-center py-4 px-4">
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
        <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
      </div>

      {/* RSVP */}
      <section id="rsvp" className="py-24 px-4 max-w-3xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>Подтверждение</p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Анкета гостя</h2>
            <p className="font-montserrat text-sm mt-4" style={{ color: "var(--c-muted)" }}>Пожалуйста, заполните до 1 июля 2026</p>
          </div>

          {submitted ? (
            <div className="text-center p-12 rounded-3xl" style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.3)" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}>
                <Icon name="Heart" size={36} style={{ color: "#fff" }} />
              </div>
              <h3 className="font-cormorant italic text-4xl mb-4" style={{ color: "var(--c-text)" }}>Спасибо, {form.name}!</h3>
              <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>
                Мы получили вашу анкету и с нетерпением ждём встречи с вами.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl space-y-6"
              style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}>

              <div className="space-y-2">
                <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>ФИО гостя *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Иванов Иван Иванович"
                  className="w-full px-5 py-4 rounded-xl font-montserrat text-sm outline-none transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(230,170,80,0.2)", color: "var(--c-text)" }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--c-gold)"}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(230,170,80,0.2)"} />
              </div>

              <div className="space-y-3">
                <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>Вы придёте? *</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Да, обязательно!", "К сожалению, нет"].map(opt => (
                    <button key={opt} type="button" onClick={() => setForm({ ...form, attending: opt })}
                      className="py-4 px-4 rounded-xl font-montserrat text-sm transition-all duration-200"
                      style={{
                        border: form.attending === opt ? "1px solid var(--c-gold)" : "1px solid rgba(230,170,80,0.2)",
                        background: form.attending === opt ? "linear-gradient(135deg, rgba(230,90,60,0.2), rgba(230,170,80,0.2))" : "rgba(255,255,255,0.03)",
                        color: form.attending === opt ? "var(--c-gold)" : "var(--c-muted)",
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>Что будете пить?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Шампанское", "Вино красное", "Вино белое", "Сок / вода", "Виски / коньяк", "Не пью алкоголь"].map(drink => (
                    <button key={drink} type="button" onClick={() => setForm({ ...form, drink })}
                      className="py-3 px-3 rounded-xl font-montserrat text-xs transition-all duration-200"
                      style={{
                        border: form.drink === drink ? "1px solid var(--c-gold)" : "1px solid rgba(230,170,80,0.2)",
                        background: form.drink === drink ? "linear-gradient(135deg, rgba(230,90,60,0.2), rgba(230,170,80,0.2))" : "rgba(255,255,255,0.03)",
                        color: form.drink === drink ? "var(--c-gold)" : "var(--c-muted)",
                      }}>
                      {drink}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>Пожелание молодожёнам</label>
                <textarea value={form.wish} onChange={e => setForm({ ...form, wish: e.target.value })}
                  placeholder="Ваше тёплое пожелание..."
                  rows={3}
                  className="w-full px-5 py-4 rounded-xl font-montserrat text-sm outline-none transition-all duration-200 resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(230,170,80,0.2)", color: "var(--c-text)" }}
                  onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--c-gold)"}
                  onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "rgba(230,170,80,0.2)"} />
              </div>

              <button type="submit"
                className="w-full py-5 font-montserrat text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(230,90,60,0.35)" }}>
                Отправить анкету
              </button>
            </form>
          )}
        </Section>
      </section>

      <div className="flex items-center justify-center py-4 px-4">
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to right, transparent, var(--c-gold))", opacity: 0.4 }} />
        <span className="mx-6 text-2xl" style={{ color: "var(--c-gold)" }}>✦</span>
        <div style={{ height: 1, flex: 1, maxWidth: 200, background: "linear-gradient(to left, transparent, var(--c-gold))", opacity: 0.4 }} />
      </div>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 max-w-4xl mx-auto text-center">
        <Section>
          <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>Связь с нами</p>
          <h2 className="font-cormorant italic text-5xl md:text-6xl mb-12" style={{ color: "var(--c-text)" }}>Контакты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Дмитрий", value: "+7 (999) 000-00-00", href: "tel:+79990000000" },
              { icon: "Phone", title: "Елена", value: "+7 (999) 000-00-01", href: "tel:+79990000001" },
              { icon: "MessageCircle", title: "Telegram / WhatsApp", value: "@wedding_de26", href: "https://t.me/" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="block p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)", textDecoration: "none" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}>
                  <Icon name={c.icon} fallback="Phone" size={22} style={{ color: "#fff" }} />
                </div>
                <p className="font-cormorant text-xl mb-1" style={{ color: "var(--c-text)" }}>{c.title}</p>
                <p className="font-montserrat text-sm" style={{ color: "var(--c-gold)" }}>{c.value}</p>
              </a>
            ))}
          </div>
        </Section>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center" style={{ borderTop: "1px solid rgba(230,170,80,0.1)" }}>
        <p className="font-cormorant italic text-3xl mb-2" style={{ color: "var(--c-gold)" }}>Дмитрий & Елена</p>
        <p className="font-montserrat text-xs tracking-widest uppercase" style={{ color: "var(--c-muted)" }}>14 · 08 · 2026</p>
        <p className="font-montserrat text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>С любовью ❤</p>
      </footer>

      <style>{`
        :root {
          --c-bg: #FDF8F3;
          --c-card: #FFFFFF;
          --c-text: #2C1810;
          --c-muted: rgba(44,24,16,0.5);
          --c-gold: #B8832A;
          --c-coral: #C94F30;
        }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.2); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1.2s ease both; }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: rgba(44,24,16,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #FDF8F3; }
        ::-webkit-scrollbar-thumb { background: var(--c-gold); border-radius: 2px; }
      `}</style>
    </div>
  );
}