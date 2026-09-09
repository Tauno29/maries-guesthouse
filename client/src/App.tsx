import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-oat text-ink selection:bg-saffron selection:text-ink">
            <header
              className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}
              aria-label="Primary navigation"
            >
              <a className="brand-mark" href="#top" onClick={closeMenu} aria-label="Marie’s Guesthouse home">
                <span className="brand-mark__name">Marie’s</span>
                <span className="brand-mark__descriptor">Guesthouse</span>
              </a>

              <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
                <a href="#stay" onClick={closeMenu}>The stay</a>
                <a href="#rooms" onClick={closeMenu}>Rooms</a>
                <a href="#essentials" onClick={closeMenu}>Essentials</a>
                <a href="#find-us" onClick={closeMenu}>Find us</a>
                <a className="nav-cta" href="#enquire" onClick={closeMenu}>
                  Enquire <ArrowUpRight size={15} strokeWidth={1.8} />
                </a>
              </nav>

              <button
                className="menu-toggle"
                type="button"
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </header>
            <Home />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
// Keep the toaster mounted for future owner updates or availability integrations.
export { Toaster };
