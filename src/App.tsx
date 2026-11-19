import { useState, useEffect } from "react";
import { Nav } from "./components/Nav";
import { SocialRail } from "./components/SocialRail";
import { Headline } from "./components/Headline";
import { Stats } from "./components/Stats";
import { Portrait } from "./components/Portrait";
import { Works } from "./components/Works";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Placeholder } from "./components/Placeholder";

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
  const [isTransitioning, setIsTransitioning] = useState(false);

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

    setIsTransitioning(true);
    const timer = window.setTimeout(() => {
      setDisplayRoute(route);
      setIsTransitioning(false);
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

    if (displayRoute === "profile") {
      return (
        <Placeholder
          title="Profile"
          onNavigateHome={navigateHome}
          onNavigateSection={navigateTo}
        />
      );
    }

    // Any other page that is under construction or not yet built
    if (displayRoute !== "") {
      return (
        <Placeholder
          title={formatTitle(displayRoute) || "In Progress"}
          onNavigateHome={navigateHome}
          onNavigateSection={navigateTo}
        />
      );
    }

    return (
      <main className="hero">
        <Nav activeSection="" onNavigate={navigateTo} />
        <SocialRail />
        <Headline />
        <Portrait />
        <Stats />
      </main>
    );
  };

  return (
    <div
      className={`page-transition ${
        isTransitioning ? "page-transition--out" : "page-transition--in"
      }`}
    >
      {renderContent()}
    </div>
  );
}
