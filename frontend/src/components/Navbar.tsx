
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="text-yellow-500 mr-1">Construtora</span>EBO
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Início
            </Link>
            <Link to="/vendas" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Vendas
            </Link>
            <Link to="/locacao" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Locação
            </Link>
            <Link to="/informacoes" className="text-gray-600 hover:text-yellow-500 transition-colors">
              Informações
            </Link>
            <Link to="/contato">
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600">
                Contato
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/vendas"
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Vendas
            </Link>
            <Link
              to="/locacao"
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Locação
            </Link>
            <Link
              to="/informacoes"
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Informações
            </Link>
            <Link
              to="/contato"
              className="block py-2 px-4 text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
