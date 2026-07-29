import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { installRuntimeErrorLogger } from './lib/runtimeErrorLogger'

installRuntimeErrorLogger();

createRoot(document.getElementById("root")!).render(<App />);

// Register a minimal service worker on production hosts only.
// This enables Chrome/Android's "Install app" prompt without caching content,
// so the Lovable editor preview is never affected.
if ("serviceWorker" in navigator) {
  const host = window.location.hostname;
  const isInIframe = (() => {
    try { return window.self !== window.top; } catch { return true; }
  })();
  const isProductionHost =
    host === "ecdcoding.co.za" ||
    host === "www.ecdcoding.co.za" ||
    host === "ecdcoding.lovable.app";

  if (isProductionHost && !isInIframe) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  } else {
    // Clean up any SW that might have been registered previously in preview/iframe.
    navigator.serviceWorker.getRegistrations?.().then((regs) => {
      regs.forEach((r) => r.unregister());
    });
  }
}
