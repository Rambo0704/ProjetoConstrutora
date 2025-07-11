import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const HomeAdmin = () => {
  const navigate = useNavigate();

  const handleGoToProdutos = () => {
    navigate("/admin/dashboard"); // <-- Correto
  };

  const handleGoToAlocacoes = () => {
    navigate("/admin/alocacoes"); // <-- Correto
  };

  return (
    <Layout>
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-10">Painel Administrativo</h1>
        <div className="flex flex-col items-center gap-6">
          <Button
            className="w-64 py-6 text-lg bg-blue-600 hover:bg-blue-700"
            onClick={handleGoToProdutos}
          >
            Cadastrar Produtos
          </Button>
          <Button
            className="w-64 py-6 text-lg bg-green-600 hover:bg-green-700"
            onClick={handleGoToAlocacoes}
          >
            Cadastrar Alocações
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomeAdmin;
