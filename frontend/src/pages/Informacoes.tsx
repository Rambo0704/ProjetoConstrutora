
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Informacoes = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Informações</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Conheça mais sobre nossa empresa, serviços e tire suas dúvidas sobre nossos produtos e processos.
          </p>
        </div>
      </section>

      {/* Sobre Nós */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Sobre a Construtora EBO</h2>
              <p className="text-gray-600 mb-4">
                A Construtora EBO atua há mais de 15 anos no mercado de construção civil, oferecendo serviços e produtos de qualidade para construtores, engenheiros e arquitetos.
              </p>
              <p className="text-gray-600 mb-4">
                Nossa missão é fornecer materiais e equipamentos de qualidade para nossos clientes, garantindo a satisfação e o sucesso de seus projetos. Valorizamos a transparência, qualidade e o compromisso com prazos.
              </p>
              <p className="text-gray-600">
                Contamos com uma equipe qualificada, pronta para oferecer o melhor atendimento e orientação técnica para suas necessidades específicas.
              </p>
            </div>
            <div className="lg:w-1/2 bg-gray-200 h-80 w-full flex items-center justify-center">
              <span className="text-gray-400">Imagem da empresa</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Como funciona o processo de orçamento?
                </AccordionTrigger>
                <AccordionContent>
                  Para solicitar um orçamento, basta entrar em contato conosco por telefone, email ou pelo formulário de contato. Nossa equipe irá avaliar suas necessidades e enviar um orçamento detalhado em até 48 horas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Quais são as formas de pagamento aceitas?
                </AccordionTrigger>
                <AccordionContent>
                  Aceitamos pagamentos em dinheiro, cartão de crédito/débito, PIX, boleto bancário e transferência. Para compras maiores, oferecemos opções de parcelamento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Vocês realizam entregas? Qual o prazo?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, realizamos entregas em toda a cidade e região metropolitana. O prazo varia de acordo com a disponibilidade do produto e a localização da entrega, geralmente entre 1 e 3 dias úteis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Como funciona o aluguel de equipamentos?
                </AccordionTrigger>
                <AccordionContent>
                  Para alugar equipamentos, é necessário apresentar documentos pessoais e comprovante de residência. Cobramos uma diária mínima e oferecemos descontos para períodos mais longos. Para equipamentos de maior valor, pode ser solicitada uma caução.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  Vocês oferecem garantia para os produtos?
                </AccordionTrigger>
                <AccordionContent>
                  Sim, todos os nossos produtos possuem garantia de fábrica. O período varia de acordo com o fabricante e tipo de produto. Em caso de defeitos, entre em contato conosco para orientações sobre como proceder.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nossos Serviços</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Venda de Materiais</h3>
              <p className="text-gray-600">
                Comercializamos uma ampla variedade de materiais de construção para atender a todos os tipos de projetos, desde pequenas reformas até grandes obras.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Locação de Equipamentos</h3>
              <p className="text-gray-600">
                Disponibilizamos equipamentos modernos e bem mantidos para locação, com preços competitivos e condições flexíveis para atender às suas necessidades.
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Consultoria Técnica</h3>
              <p className="text-gray-600">
                Nossa equipe de especialistas está disponível para orientar e aconselhar sobre os melhores materiais e equipamentos para o seu projeto específico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Pronto para iniciar seu projeto?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco hoje mesmo para obter mais informações sobre nossos produtos e serviços.
          </p>
          <Link to="/contato">
            <Button className="bg-white text-yellow-500 hover:bg-gray-100 px-8 py-3 text-lg">
              Entre em Contato
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Informacoes;
