import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Section } from "./shared";

export default function WeddingRsvp() {
  const [form, setForm] = useState({ name: "", attending: "", drink: "", wish: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 px-4 max-w-3xl mx-auto">
      <Section>
        <div className="text-center mb-16">
          <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
            Подтверждение
          </p>
          <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>
            Анкета гостя
          </h2>
          <p className="font-montserrat text-sm mt-4" style={{ color: "var(--c-muted)" }}>
            Пожалуйста, заполните до 1 июля 2026
          </p>
        </div>

        {submitted ? (
          <div
            className="text-center p-12 rounded-3xl"
            style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.3)" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}
            >
              <Icon name="Heart" size={36} style={{ color: "#fff" }} />
            </div>
            <h3 className="font-cormorant italic text-4xl mb-4" style={{ color: "var(--c-text)" }}>
              Спасибо, {form.name}!
            </h3>
            <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>
              Мы получили вашу анкету и с нетерпением ждём встречи с вами.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 rounded-3xl space-y-6"
            style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}
          >
            <div className="space-y-2">
              <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>
                ФИО гостя *
              </label>
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Иванов Иван Иванович"
                className="w-full px-5 py-4 rounded-xl font-montserrat text-sm outline-none transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(230,170,80,0.2)", color: "var(--c-text)" }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--c-gold)"}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "rgba(230,170,80,0.2)"}
              />
            </div>

            <div className="space-y-3">
              <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>
                Вы придёте? *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {["Да, обязательно (ЗАГС и Банкет)", "Да, обязательно (Банкет)", "К сожалению, нет"].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setForm({ ...form, attending: opt })}
                    className="py-4 px-4 rounded-xl font-montserrat text-sm transition-all duration-200"
                    style={{
                      border: form.attending === opt ? "1px solid var(--c-gold)" : "1px solid rgba(230,170,80,0.2)",
                      background: form.attending === opt ? "linear-gradient(135deg, rgba(230,90,60,0.2), rgba(230,170,80,0.2))" : "rgba(255,255,255,0.03)",
                      color: form.attending === opt ? "var(--c-gold)" : "var(--c-muted)",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>
                Что будете пить?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["Шампанское", "Вино красное", "Вино белое", "Сок / вода", "Самогончик", "Не пью алкоголь"].map(drink => (
                  <button
                    key={drink}
                    type="button"
                    onClick={() => setForm({ ...form, drink })}
                    className="py-3 px-3 rounded-xl font-montserrat text-xs transition-all duration-200"
                    style={{
                      border: form.drink === drink ? "1px solid var(--c-gold)" : "1px solid rgba(230,170,80,0.2)",
                      background: form.drink === drink ? "linear-gradient(135deg, rgba(230,90,60,0.2), rgba(230,170,80,0.2))" : "rgba(255,255,255,0.03)",
                      color: form.drink === drink ? "var(--c-gold)" : "var(--c-muted)",
                    }}
                  >
                    {drink}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-montserrat text-xs uppercase tracking-widest block" style={{ color: "var(--c-gold)" }}>
                Пожелание молодожёнам
              </label>
              <textarea
                value={form.wish}
                onChange={e => setForm({ ...form, wish: e.target.value })}
                placeholder="Ваше тёплое пожелание..."
                rows={3}
                className="w-full px-5 py-4 rounded-xl font-montserrat text-sm outline-none transition-all duration-200 resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(230,170,80,0.2)", color: "var(--c-text)" }}
                onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--c-gold)"}
                onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "rgba(230,170,80,0.2)"}
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 font-montserrat text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(230,90,60,0.35)" }}
            >
              Отправить анкету
            </button>
          </form>
        )}
      </Section>
    </section>
  );
}