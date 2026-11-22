import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { App } from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/hero.css";
import "./styles/works.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/achievements.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

createRoot(rootEl).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <App />
    </LazyMotion>
  </StrictMode>,
);
