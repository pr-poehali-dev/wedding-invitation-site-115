import Icon from "@/components/ui/icon";
import { useCountdown, CountdownBlock, PHOTO_URL } from "./shared";

export default function WeddingHero() {
  const countdown = useCountdown();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: 56 }}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={PHOTO_URL}
          alt="Wedding"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(253,248,243,0.15) 0%, rgba(253,248,243,0.45) 60%, rgba(253,248,243,1) 100%)" }}
        />
      </div>

      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
            background: `rgba(230,170,80,${0.2 + (i % 5) * 0.1})`,
            left: `${(i * 11) % 100}%`, top: `${(i * 17) % 100}%`,
            animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i % 4) * 0.7}s`,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-4 animate-fade-in">
        <p className="font-montserrat text-xs uppercase tracking-[0.4em] mb-6" style={{ color: "var(--c-gold)", opacity: 0.9 }}>
          Вы приглашены на свадьбу
        </p>
        <h1
          className="font-cormorant italic leading-none mb-4"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "var(--c-text)" }}
        >
          Дмитрий<br />
          <span style={{ color: "var(--c-gold)" }}>&</span><br />
          Елена
        </h1>
        <div className="flex items-center justify-center gap-4 my-8">
          <div style={{ height: 1, width: 60, background: "linear-gradient(to right, transparent, var(--c-gold))" }} />
          <span className="font-montserrat text-sm tracking-[0.3em] uppercase" style={{ color: "var(--c-gold)" }}>
            14 августа 2026
          </span>
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

        <button
          onClick={() => scrollTo("rsvp")}
          className="mt-12 px-10 py-4 font-montserrat text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", borderRadius: 2, boxShadow: "0 8px 32px rgba(230,90,60,0.4)" }}
        >
          Подтвердить участие
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="ChevronDown" size={28} style={{ color: "var(--c-muted)" }} />
      </div>
    </section>
  );
}
