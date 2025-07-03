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


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* --- ROTAS PÚBLICAS (AS QUE VOCÊ JÁ TINHA) --- */}
          <Route path="/" element={<Index />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/locacao" element={<Locacao />} />
          <Route path="/informacoes" element={<Informacoes />} />
          <Route path="/contato" element={<Contato />} />
          
          {/* --- 2. ADICIONE AS ROTAS DE LOGIN E ADMIN --- */}

          {/* Rota pública para a página de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Grupo de Rotas Protegidas */}
          {/* O 'ProtectedRoute' vai funcionar como um porteiro para as rotas aninhadas.
              Ele só vai deixar passar para '/admin/dashboard' se o usuário estiver logado. */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Se tivesse mais páginas de admin, elas iriam aqui dentro também */}
          </Route>

          {/* Rota para páginas não encontradas (continua no final) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;