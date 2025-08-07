import { useEffect, useRef, useState } from 'react';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const videoRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detectar se é um dispositivo iOS
    const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isAppleDevice);

    const video = videoRef.current;
    
    // Configurações específicas para iOS
    if (isAppleDevice && video) {
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;
    }

    const tryPlayVideo = async () => {
      if (video && video.readyState >= 3) { // 3 = HAVE_FUTURE_DATA
        try {
          // Tenta reproduzir o vídeo
          await video.play();
          setShowPlayButton(false);
        } catch (error) {
          console.log("Autoplay bloqueado:", error);
          setShowPlayButton(true);
        }
      }
    };

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
      tryPlayVideo();
    };

    // Evento para quando o vídeo tiver carregado dados suficientes
    if (video) {
      video.addEventListener('loadeddata', handleVideoLoaded);
      video.addEventListener('canplay', handleVideoLoaded);
      
      // Configurar pré-carregamento
      video.preload = "auto";
      
      // Forçar carregamento em dispositivos móveis
      if (isAppleDevice) {
        video.load();
      }
    }

    // Tenta reproduzir quando o usuário interagir com a página
    const handleUserInteraction = () => {
      if (video && video.paused) {
        tryPlayVideo();
      }
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      if (video) {
        video.removeEventListener('loadeddata', handleVideoLoaded);
        video.removeEventListener('canplay', handleVideoLoaded);
      }
    };
  }, []);

  const handlePlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.play()
        .then(() => setShowPlayButton(false))
        .catch(error => console.log("Falha ao reproduzir:", error));
    }
  };

  return (
    <Layout>
      {/* Hero Section com Vídeo de Fundo */}
      <section className="relative bg-gray-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* Vídeo de fundo */}
        <div className="absolute inset-0 z-0">
          <video 
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/images/logo.jpg"
          >
            <source 
              src="/videos/Vintage Culture, Rooftime - I Will Find (Official Music Video).mp4" 
              type="video/mp4" 
            /> 
            Seu navegador não suporta vídeos HTML5.
          </video>
          
          {/* Spinner de carregamento */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          )}
        </div>
        
        {/* Overlay escuro para contraste */}
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        
        {/* Botão de fallback para reprodução manual */}
        {showPlayButton && (
          <button
            onClick={handlePlayClick}
            className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full z-30 flex items-center shadow-lg"
            aria-label="Reproduzir vídeo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {/* Conteúdo do Hero */}
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Construindo o futuro com qualidade e confiança
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Produtos e equipamentos para sua obra com as melhores condições do mercado.
              Vendas e locações para todos os tipos de projetos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/vendas">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-6 text-lg">
                  Nossos Produtos
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-6 py-6 text-lg">
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Serviços */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Venda de Materiais</h3>
              <p className="text-gray-600 mb-4">
                Oferecemos uma ampla gama de materiais de construção de alta qualidade para todos os tipos de projetos.
              </p>
              <Link to="/vendas" className="text-yellow-500 hover:underline font-medium">
                Saiba mais →
              </Link>
            </div>
            
            {/* Card 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Locação de Equipamentos</h3>
              <p className="text-gray-600 mb-4">
                Equipamentos modernos e bem mantidos para locação com condições flexíveis e preços competitivos.
              </p>
              <Link to="/locacao" className="text-yellow-500 hover:underline font-medium">
                Saiba mais →
              </Link>
            </div>
            
            {/* Card 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultoria Técnica</h3>
              <p className="text-gray-600 mb-4">
                Nossa equipe de especialistas oferece consultoria para ajudar você a escolher os melhores produtos para sua obra.
              </p>
              <Link to="/informacoes" className="text-yellow-500 hover:underline font-medium">
                Saiba mais →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-yellow-500 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-2">Pronto para começar seu projeto?</h2>
              <p className="text-lg text-white opacity-90">
                Entre em contato conosco hoje mesmo para um orçamento gratuito.
              </p>
            </div>
            <Link to="/contato">
              <Button className="bg-white text-yellow-500 hover:bg-gray-100 px-8 py-3 text-lg">
                Fale Conosco
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;