
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-yellow-500">Construtora</span>EBO
            </h3>
            <p className="text-gray-300 mb-4">
              Qualidade e confiança na construção. Materiais e equipamentos para todos os tipos de projetos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-yellow-500 transition-colors">Início</Link></li>
              <li><Link to="/vendas" className="text-gray-300 hover:text-yellow-500 transition-colors">Vendas</Link></li>
              <li><Link to="/locacao" className="text-gray-300 hover:text-yellow-500 transition-colors">Locação</Link></li>
              <li><Link to="/informacoes" className="text-gray-300 hover:text-yellow-500 transition-colors">Informações</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-yellow-500 transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">Rua Exemplo, 123</p>
              <p className="mb-2">São Paulo - SP</p>
              <p className="mb-2">CEP: 00000-000</p>
              <p className="mb-2">Email: contato@construtoraebo.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Construtora EBO. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
