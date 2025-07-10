import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Vendas from "./pages/Vendas";
import Locacao from "./pages/Locacao";
import Informacoes from "./pages/Informacoes";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ NOVO: import da tela HomeAdmin
import HomeAdmin from "./pages/HomeAdmin";

// (Opcional futuro): import da tela de Alocação
// import AlocacaoDashboard from "./pages/AlocacaoDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<Index />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/locacao" element={<Locacao />} />
          <Route path="/informacoes" element={<Informacoes />} />
          <Route path="/contato" element={<Contato />} />

          {/* --- LOGIN --- */}
          <Route path="/login" element={<LoginPage />} />

          {/* --- ROTAS PROTEGIDAS --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Futuro: rota de alocação */}
            {/* <Route path="/admin/alocacoes" element={<AlocacaoDashboard />} /> */}
          </Route>

          {/* --- NOT FOUND --- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
