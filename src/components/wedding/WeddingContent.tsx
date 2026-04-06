import Icon from "@/components/ui/icon";
import { Section, Divider, PROGRAM, DRESS_CODES, PHOTO_URL } from "./shared";
import WeddingRsvp from "./WeddingRsvp";

export default function WeddingContent() {
  return (
    <>
      {/* ABOUT */}
      <section id="about" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
              Наша история
            </p>
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
              <div
                className="aspect-[3/4] rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 24px 80px rgba(44,24,16,0.15)" }}
              >
                <img src={PHOTO_URL} alt="Пара" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 12px 40px rgba(230,90,60,0.4)" }}
              >
                <span className="font-cormorant text-4xl font-bold text-white">14</span>
                <span className="font-montserrat text-xs text-white uppercase tracking-wider">Августа</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Divider />

      {/* PROGRAM */}
      <section id="program" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
              День торжества
            </p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Программа</h2>
          </div>
          <div className="relative">
            <div
              className="absolute left-[50%] top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--c-gold), transparent)", opacity: 0.4 }}
            />
            <div className="space-y-8">
              {PROGRAM.map((item, i) => (
                <div key={i} className={`flex items-center gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className="inline-block px-6 py-5 rounded-2xl transition-transform duration-300 hover:scale-105"
                      style={{ background: "var(--c-card)", border: "1px solid rgba(184,131,42,0.2)", boxShadow: "0 8px 32px rgba(44,24,16,0.08)" }}
                    >
                      <p className="font-montserrat text-xs uppercase tracking-widest mb-1" style={{ color: "var(--c-coral)" }}>{item.time}</p>
                      <h3 className="font-cormorant text-2xl mb-1" style={{ color: "var(--c-text)" }}>{item.title}</h3>
                      <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", boxShadow: "0 0 0 6px rgba(230,170,80,0.1)" }}
                    >
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

      <Divider />

      {/* LOCATION */}
      <section id="location" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
              Где нас найти
            </p>
            <h2 className="font-cormorant italic text-5xl md:text-6xl" style={{ color: "var(--c-text)" }}>Локация</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="p-8 rounded-3xl" style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}
                >
                  <Icon name="MapPin" size={22} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl mb-1" style={{ color: "var(--c-text)" }}>ЗАГС Дзержинского района</h3>
                  <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>г. Пермь, ул. Ленина, 98</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Icon name="Clock" size={16} style={{ color: "var(--c-gold)" }} />
                  <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Начало в 10:00</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Car" size={16} style={{ color: "var(--c-gold)" }} />
                  <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Парковка для гостей — платная</span>
                </div>
              </div>
              <a
                href="https://yandex.ru/maps/org/zags_dzerzhinskogo_rayona/1734593233/?ll=56.200083%2C58.004724&z=16.71"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", textDecoration: "none" }}
              >
                <Icon name="Navigation" size={16} />
                Открыть на карте
              </a>
            </div>
            <div className="p-8 rounded-3xl" style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)" }}>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}
                >
                  <Icon name="MapPin" size={22} style={{ color: "#fff" }} />
                </div>
                <div>
                  <h3 className="font-cormorant text-2xl mb-1" style={{ color: "var(--c-text)" }}>База отдыха «Зеленино»</h3>
                  <p className="font-montserrat text-xs mb-0.5" style={{ color: "var(--c-gold)" }}>Беседка «Белый лофт»</p>
                  <p className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>г. Пермь, Апрельская ул., 51</p>
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
              </div>
              <a
                href="https://yandex.ru/maps/org/zelenino/174411448212/?ll=56.369374%2C57.963178&z=16.71"
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-montserrat text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))", color: "#fff", textDecoration: "none" }}
              >
                <Icon name="Navigation" size={16} />
                Открыть на карте
              </a>
            </div>

          </div>
        </Section>
      </section>

      <Divider />

      {/* DRESS CODE */}
      <section id="dresscode" className="py-24 px-4 max-w-5xl mx-auto">
        <Section>
          <div className="text-center mb-16">
            <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
              Внешний вид
            </p>
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
                  <div
                    className="w-16 h-16 rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: dc.color, boxShadow: `0 8px 24px ${dc.color}60` }}
                  />
                  <span className="font-montserrat text-xs uppercase tracking-wider" style={{ color: "var(--c-muted)" }}>{dc.name}</span>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "rgba(230,90,60,0.08)", border: "1px solid rgba(230,90,60,0.15)" }}
              >
                <Icon name="CheckCircle" size={20} style={{ color: "var(--c-coral)" }} />
                <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Вечерние платья и костюмы приветствуются</span>
              </div>
              <div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{ background: "rgba(230,90,60,0.08)", border: "1px solid rgba(230,90,60,0.15)" }}
              >
                <Icon name="XCircle" size={20} style={{ color: "var(--c-coral)" }} />
                <span className="font-montserrat text-sm" style={{ color: "var(--c-muted)" }}>Белый и чёрный цвета просим не выбирать</span>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Divider />

      <WeddingRsvp />

      <Divider />

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4 max-w-4xl mx-auto text-center">
        <Section>
          <p className="font-montserrat text-xs uppercase tracking-widest mb-3" style={{ color: "var(--c-coral)" }}>
            Связь с нами
          </p>
          <h2 className="font-cormorant italic text-5xl md:text-6xl mb-12" style={{ color: "var(--c-text)" }}>Контакты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "Phone", title: "Дмитрий", value: "+7 (951) 943-10-17", href: "tel:+79519431017" },
              { icon: "Phone", title: "Елена", value: "+7 (952) 338-28-08", href: "tel:+79523382808" },

            ].map((c, i) => (
              <a
                key={i}
                href={c.href}
                className="block p-8 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ background: "var(--c-card)", border: "1px solid rgba(230,170,80,0.15)", textDecoration: "none" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, var(--c-coral), var(--c-gold))" }}
                >
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
        <p className="font-montserrat text-xs mt-4" style={{ color: "rgba(44,24,16,0.2)" }}>С любовью ❤</p>
      </footer>
    </>
  );
}