import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Report from "./pages/Report";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={<Report />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

(() => {
  const container = document.getElementById("root");
  if (!container) return;

  // Avoid calling createRoot multiple times during HMR or double imports.
  // Store the root on the container to reuse it if present.
  const anyContainer = container as any;
  if (anyContainer.__reactRoot) {
    try {
      anyContainer.__reactRoot.render(<App />);
    } catch (e) {
      // If render fails, recreate the root cleanly.
      const root = createRoot(container);
      anyContainer.__reactRoot = root;
      root.render(<App />);
    }
  } else {
    const root = createRoot(container);
    anyContainer.__reactRoot = root;
    root.render(<App />);
  }
})();
