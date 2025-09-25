import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

function mount() {
  const container = document.getElementById("root");
  if (!container) return;
  const anyContainer = container as any;
  if (anyContainer.__reactRoot) {
    anyContainer.__reactRoot.render(<App />);
  } else {
    const root = createRoot(container);
    anyContainer.__reactRoot = root;
    root.render(<App />);
  }
}

mount();

// HMR support
if (import.meta.hot) {
  import.meta.hot.accept("./App", (newModule) => {
    try {
      mount();
    } catch (e) {
      console.error("HMR mount error:", e);
    }
  });
}
