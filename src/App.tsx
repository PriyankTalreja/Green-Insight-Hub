import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import ExecutiveSummary from "./pages/ExecutiveSummary";
import Strategic from "./pages/Strategic";
import Competitive from "./pages/Competitive";
import Operational from "./pages/Operational";
import Tactical from "./pages/Tactical";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<ExecutiveSummary />} />
            <Route path="/strategic" element={<Strategic />} />
            <Route path="/competitive" element={<Competitive />} />
            <Route path="/operational" element={<Operational />} />
            <Route path="/tactical" element={<Tactical />} />
            <Route path="/insights" element={<Insights />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
