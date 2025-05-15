
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Locacao = () => {
  const equipamentos = [
    {
      id: 1,
      nome: "Betoneira 400 Litros",
      descricao: "Betoneira com capacidade para 400 litros, ideal para obras de médio porte.",
      preco: "R$ 120,00/dia",
      imagem: "placeholder"
    },
    {
      id: 2,
      nome: "Andaime Tubular",
      descricao: "Andaime tubular de 1,5m x 1,0m, com plataforma e guarda-corpo.",
      preco: "R$ 30,00/dia",
      imagem: "placeholder"
    },
    {
      id: 3,
      nome: "Compressor de Ar",
      descricao: "Compressor de ar 20 PCM, ideal para pinturas e equipamentos pneumáticos.",
      preco: "R$ 90,00/dia",
      imagem: "placeholder"
    },
    {
      id: 4,
      nome: "Martelete Rompedor",
      descricao: "Martelete rompedor para perfuração e demolição em concreto.",
      preco: "R$ 70,00/dia",
      imagem: "placeholder"
    },
    {
      id: 5,
      nome: "Serra Circular",
      descricao: "Serra circular de bancada para cortes precisos em madeira.",
      preco: "R$ 60,00/dia",
      imagem: "placeholder"
    },
    {
      id: 6,
      nome: "Escora Metálica",
      descricao: "Escora metálica ajustável para sustentação de lajes e formas.",
      preco: "R$ 15,00/dia",
      imagem: "placeholder"
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Equipamentos para Locação</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Dispomos de diversos equipamentos para locação, ideais para obras de pequeno, médio e grande porte.
            Todos os equipamentos passam por manutenção regular e são entregues em perfeitas condições de uso.
          </p>
        </div>
      </section>

      {/* Equipamentos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipamentos.map((equipamento) => (
              <div key={equipamento.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Imagem do equipamento</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{equipamento.nome}</h3>
                  <p className="text-gray-600 mb-4">{equipamento.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold text-lg">{equipamento.preco}</span>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Reservar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informações */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Informações sobre Locação</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Condições para Locação</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Apresentação de documentos pessoais</li>
                <li>• Comprovante de residência</li>
                <li>• Pagamento adiantado</li>
                <li>• Caução para equipamentos de alto valor</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Prazos de Locação</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Locação mínima de 1 dia</li>
                <li>• Descontos para períodos maiores</li>
                <li>• Renovações mediante disponibilidade</li>
                <li>• Reservas antecipadas disponíveis</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3">Serviços Adicionais</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Entrega no local da obra</li>
                <li>• Treinamento básico de operação</li>
                <li>• Manutenção durante o período</li>
                <li>• Suporte técnico por telefone</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
