// em src/pages/AdminDashboard.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import ProductForm from '@/components/admin/ProductForm'; // <-- 1. IMPORTE O FORMULÁRIO

// --- 2. IMPORTE OS COMPONENTES DO MODAL (DIALOG) ---
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Interface do Produto (pode manter a mesma)
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
}

const AdminDashboard = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();

  // --- 3. ESTADOS PARA CONTROLAR O MODAL E A EDIÇÃO ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    try {
      const response = await api.get<Produto[]>('/produtos/');
      setProdutos(response.data);
    } catch (error) {
      console.error("Falha ao buscar produtos", error);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`/produtos/${id}/`);
        alert("Produto excluído com sucesso!");
        fetchProdutos(); // Re-busca os produtos para atualizar a lista
      } catch (error) {
        console.error("Falha ao excluir produto", error);
        alert("Não foi possível excluir o produto.");
      }
    }
  };

  // --- 4. FUNÇÕES PARA ABRIR O MODAL ---
  const handleAddNew = () => {
    setProductToEdit(null); // Garante que o formulário estará vazio
    setIsModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setProductToEdit(produto); // Passa o produto para o formulário
    setIsModalOpen(true);
  };

  // --- 5. FUNÇÃO DE CALLBACK PARA QUANDO O FORMULÁRIO TIVER SUCESSO ---
  const handleSuccess = () => {
    setIsModalOpen(false); // Fecha o modal
    fetchProdutos(); // Atualiza a lista de produtos
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
          <div>
            {/* O botão agora abre o modal */}
            <Button onClick={handleAddNew} className="mr-4 bg-green-600 hover:bg-green-700">
              Adicionar Novo Produto
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Sair
            </Button>
          </div>
        </div>

        {/* Tabela de produtos (a mesma de antes, mas com o botão de editar funcional) */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              {/* ... cabeçalho da tabela ... */}
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr key={produto.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.nome}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.preco}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* Botão de editar agora chama a função handleEdit */}
                    <Button onClick={() => handleEdit(produto)} variant="outline" className="mr-2">
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(produto.id)} variant="destructive">
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- 6. MODAL (DIALOG) PARA O FORMULÁRIO --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ProductForm 
              productToEdit={productToEdit} 
              onSuccess={handleSuccess} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default AdminDashboard;