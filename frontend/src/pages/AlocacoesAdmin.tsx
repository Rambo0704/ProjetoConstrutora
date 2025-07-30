// src/pages/AlocacoesAdmin.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import AlocacaoForm from '@/components/admin/AlocacaoForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Alocacao {
  id: number;
  nome_cliente: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  observacoes: string;
  imagem_alocacao?: string; // Adicionado campo de imagem
}

const AlocacoesAdmin = () => {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alocacaoToEdit, setAlocacaoToEdit] = useState<Alocacao | null>(null);
  const navigate = useNavigate();

  const fetchAlocacoes = async () => {
    try {
      const response = await api.get('/alocacoes/');
      setAlocacoes(response.data);
    } catch (err) {
      console.error('Erro ao buscar alocações:', err);
    }
  };

  useEffect(() => {
    fetchAlocacoes();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta alocação?")) {
      try {
        await api.delete(`/alocacoes/${id}/`);
        alert("Alocação excluída com sucesso!");
        fetchAlocacoes();
      } catch (err) {
        console.error("Falha ao excluir alocação", err);
        alert("Não foi possível excluir a alocação.");
      }
    }
  };

  const handleAddNew = () => {
    setAlocacaoToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (alocacao: Alocacao) => {
    setAlocacaoToEdit(alocacao);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchAlocacoes();
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Alocações</h1>
          <div>
            <Button onClick={handleAddNew} className="mr-4 bg-green-600 hover:bg-green-700">
              Nova Alocação
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Sair
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Equipamento
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Período
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Local
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {alocacoes.map((aloc) => (
                <tr key={aloc.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-3">
                      {aloc.imagem_alocacao && (
                        <img
                          src={aloc.imagem_alocacao}
                          alt={`Imagem de ${aloc.nome_cliente}`}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <p className="text-gray-900 whitespace-no-wrap">{aloc.nome_cliente}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {aloc.data_inicio} a {aloc.data_fim}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{aloc.local}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <Button 
                      onClick={() => handleEdit(aloc)} 
                      variant="outline" 
                      className="mr-2"
                    >
                      Editar
                    </Button>
                    <Button 
                      onClick={() => handleDelete(aloc.id)} 
                      variant="destructive"
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{alocacaoToEdit ? "Editar Alocação" : "Nova Alocação"}</DialogTitle>
          </DialogHeader>
          <AlocacaoForm alocacaoToEdit={alocacaoToEdit} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AlocacoesAdmin;
