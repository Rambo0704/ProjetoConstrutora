import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api from "@/services/api";

interface Alocacao {
  id: number;
  nome_cliente: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  observacoes: string;
  imagem_alocacao: string; // Adicione esta propriedade
}

const Locacao = () => {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlocacoes = async () => {
      try {
        const response = await api.get("/alocacoes/");
        setAlocacoes(response.data);
      } catch (error) {
        console.error("Erro ao carregar alocações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlocacoes();
  }, []);

  return (
    <Layout>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Locações Realizadas</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Veja os registros de alocações de nossos equipamentos feitas por clientes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <p>Carregando alocações...</p>
          ) : alocacoes.length === 0 ? (
            <p>Nenhuma alocação encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {alocacoes.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {item.imagem_alocacao ? (
                    <img 
                      src={item.imagem_alocacao} 
                      alt={`Alocação para ${item.nome_cliente}`} 
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sem imagem</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {item.nome_cliente}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Local:</strong> {item.local}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong>Período:</strong> {item.data_inicio} até {item.data_fim}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <strong>Observações:</strong> {item.observacoes}
                    </p>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Reservar semelhante
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Informações sobre Locação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          </div>
        </div>
      </section>

      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Precisa de um orçamento personalizado?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para verificar disponibilidade e condições especiais para locações de longa duração.
          </p>
          <Link to="/contato">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg">
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Locacao;