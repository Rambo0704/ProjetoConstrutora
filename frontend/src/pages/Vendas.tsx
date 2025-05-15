
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Vendas = () => {
  const produtos = [
    {
      id: 1,
      nome: "Cimento Portland",
      descricao: "Cimento de alta qualidade para diversos tipos de obra.",
      preco: "R$ 29,90",
      imagem: "placeholder"
    },
    {
      id: 2,
      nome: "Bloco Cerâmico",
      descricao: "Blocos cerâmicos 9x19x29cm para paredes e estruturas.",
      preco: "R$ 1,49",
      imagem: "placeholder"
    },
    {
      id: 3,
      nome: "Areia Média",
      descricao: "Areia de qualidade para concretos e argamassas.",
      preco: "R$ 120,00/m³",
      imagem: "placeholder"
    },
    {
      id: 4,
      nome: "Vergalhão CA-50",
      descricao: "Barras de aço para concreto armado em diversas bitolas.",
      preco: "R$ 72,90",
      imagem: "placeholder"
    },
    {
      id: 5,
      nome: "Argamassa Colante",
      descricao: "Argamassa para assentamento de revestimentos cerâmicos.",
      preco: "R$ 19,90",
      imagem: "placeholder"
    },
    {
      id: 6,
      nome: "Tinta Acrílica",
      descricao: "Tinta de alta cobertura para interiores e exteriores.",
      preco: "R$ 189,90",
      imagem: "placeholder"
    }
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do produto</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
                  <p className="text-gray-600 mb-4">{produto.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold text-lg">{produto.preco}</span>
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
