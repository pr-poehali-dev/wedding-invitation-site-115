import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { NAV_LINKS } from "./shared";

export default function WeddingNav() {
  const [activeNav, setActiveNav] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map(l => document.getElementById(l.id));
      const current = sections.findLast(s => s && s.getBoundingClientRect().top < 120);
      setActiveNav(current?.id || "");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{ background: "rgba(237,232,223,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(17,17,17,0.1)" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-cormorant italic text-lg tracking-wide"
          style={{ color: "var(--c-gold)" }}
        >
          Д & Е
        </button>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-montserrat text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: activeNav === l.id ? "var(--c-gold)" : "var(--c-muted)" }}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--c-gold)" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3" style={{ background: "rgba(237,232,223,0.98)" }}>
          {NAV_LINKS.map(l => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-left font-montserrat text-xs uppercase tracking-widest py-2"
              style={{ color: "var(--c-text)" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}