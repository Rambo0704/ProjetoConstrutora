
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api from "@/services/api";

interface Produto {
  id: number;
  nome_produto: string;
  descricao_produto: string; 
  preco_produto: string; 
  imagem_produto: string; 
  quantidade_estoque: number
}

const Vendas = () => {

  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {

        const response = await api.get<Produto[]>('/produtos/');
 
        setProdutos(response.data);
      } catch (err) {

        setError("Falha ao carregar os produtos. Tente novamente mais tarde.");
        console.error("Erro ao buscar produtos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);


  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold">Carregando produtos...</h2>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center text-red-600">
          <h2 className="text-2xl font-semibold">Ocorreu um Erro</h2>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Produtos para Venda</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Temos uma ampla gama de materiais de construção de alta qualidade para atender às necessidades da sua obra.
            Todos os produtos são de marcas reconhecidas e com garantia de procedência.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* --- 6. ATUALIZAÇÃO DO MAP --- */}
          {/* Agora o .map() usa a variável de estado 'produtos' */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {/* Quando tiver o campo de imagem, você pode usar: <img src={produto.imagem_produto} /> */}
                  <span className="text-gray-400">Imagem do produto</span>
                </div>
                <div className="p-6">
                  {/* Usamos os campos do nosso estado 'produto' */}
                  <h3 className="text-xl font-semibold mb-2">{produto.nome_produto}</h3>
                  <p className="text-gray-600 mb-4">{produto.descricao_produto}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold text-lg">{produto.preco_produto}</span>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Solicitar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e podemos verificar a disponibilidade de outros materiais para seu projeto.
          </p>
          <Link to="/contato">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 text-lg">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Vendas;