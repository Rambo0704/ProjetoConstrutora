import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // Adicionado useNavigate
import api from "@/services/api";

interface Produto {
  id: number;
  nome_produto: string;
  descricao_produto: string;
  preco_produto: string;
  imagem: string;
  quantidade_estoque: number;
}

const Vendas = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook para navegação

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

  // Função para gerar a mensagem pré-preenchida
  const gerarMensagemProduto = (produto: Produto) => {
    return `Olá, gostaria de solicitar informações sobre o produto: 
${produto.nome_produto}
Preço: ${produto.preco_produto}
Descrição: ${produto.descricao_produto}

Por favor, entre em contato comigo para discutir detalhes sobre este produto.`;
  };

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
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Produtos para Venda</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Temos uma ampla gama de materiais de construção de alta qualidade para atender às necessidades da sua obra.
            Todos os produtos são de marcas reconhecidas e com garantia de procedência.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt={produto.nome_produto}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Imagem do produto</span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{produto.nome_produto}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{produto.descricao_produto}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-yellow-500 font-bold text-lg">{produto.preco_produto}</span>
                    {/* Botão modificado para Link com state */}
                    <Link 
                      to="/contato" 
                      state={{ 
                        message: gerarMensagemProduto(produto),
                        produto: produto.nome_produto 
                      }}
                    >
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        Solicitar
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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