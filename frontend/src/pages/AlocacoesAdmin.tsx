// src/pages/AlocacoesAdmin.tsx
import { useState, useEffect } from 'react';
import api from '@/services/api';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import AlocacaoForm from '@/components/admin/AlocacaoForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Alocacao {
  id: number;
  nome_cliente: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  observacoes: string;
}

const AlocacoesAdmin = () => {
  const [alocacoes, setAlocacoes] = useState<Alocacao[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alocacaoToEdit, setAlocacaoToEdit] = useState<Alocacao | null>(null);

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

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Gerenciar Alocações</h1>
        <Button onClick={handleAddNew} className="mb-4 bg-green-600 hover:bg-green-700">
          Nova Alocação
        </Button>

        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Cliente</th>
              <th>Período</th>
              <th>Local</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alocacoes.map((aloc) => (
              <tr key={aloc.id}>
                <td>{aloc.nome_cliente}</td>
                <td>{aloc.data_inicio} a {aloc.data_fim}</td>
                <td>{aloc.local}</td>
                <td>
                  <Button onClick={() => handleEdit(aloc)} variant="outline" className="mr-2">
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
