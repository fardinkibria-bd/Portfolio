import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "./components/Nav";
import { Headline } from "./components/Headline";
import { Portrait } from "./components/Portrait";
import { LogoMarquee } from "./components/LogoMarquee";
import { SocialRail } from "./components/SocialRail";
import { Works } from "./components/Works";
import { About } from "./components/About";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { Placeholder } from "./components/Placeholder";
import { fadeIn } from "./utils/animations";

function normalizeHash(hash: string): string {
  return hash.replace(/^#\/?/, "").toLowerCase().trim();
}

function formatTitle(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function App() {
  const [route, setRoute] = useState(() => normalizeHash(window.location.hash));
  const [displayRoute, setDisplayRoute] = useState(route);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(normalizeHash(window.location.hash));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (route === displayRoute) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplayRoute(route);
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayRoute(route);
      window.scrollTo(0, 0);
    }, 180);

    return () => window.clearTimeout(timer);
  }, [route, displayRoute]);

  const navigateTo = (section: string) => {
    window.location.hash = section;
    setRoute(section);
  };

  const navigateHome = () => {
    window.location.hash = "";
    setRoute("");
  };

  const renderContent = () => {
    if (displayRoute === "my-works") {
      return (
        <Works onNavigateHome={navigateHome} onNavigateSection={navigateTo} />
      );
    }

    if (displayRoute === "about") {
      return (
        <About onNavigateHome={navigateHome} onNavigateSection={navigateTo} />
      );
    }

    if (displayRoute === "contact") {
      return (
        <Contact onNavigateHome={navigateHome} onNavigateSection={navigateTo} />
      );
    }

    if (displayRoute === "achievements" || displayRoute === "profile") {
      return (
        <Achievements
          onNavigateHome={navigateHome}
          onNavigateSection={navigateTo}
        />
      );
    }

    // Any other page that is under construction
    if (displayRoute !== "") {
      return (
        <Placeholder
          title={formatTitle(displayRoute) || "In Progress"}
          onNavigateHome={navigateHome}
          onNavigateSection={navigateTo}
        />
      );
    }

    // Default: Home Hero Screen
    return (
      <div className="home-layout">
        <Nav
          activeSection=""
          onNavigate={navigateTo}
          onNavigateHome={navigateHome}
        />
        <main className="hero-section">
          <div className="hero-panel">
            <Headline onNavigate={navigateTo} />
            <Portrait />
          </div>
          <LogoMarquee />
        </main>
        <SocialRail />
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={displayRoute}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={fadeIn}
        className="page-wrapper"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}
