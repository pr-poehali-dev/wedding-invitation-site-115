import WeddingNav from "@/components/wedding/WeddingNav";
import WeddingHero from "@/components/wedding/WeddingHero";
import WeddingContent from "@/components/wedding/WeddingContent";

export default function Index() {
  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", background: "var(--c-bg)", color: "var(--c-text)", minHeight: "100vh" }}>
      <WeddingNav />
      <WeddingHero />
      <WeddingContent />

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