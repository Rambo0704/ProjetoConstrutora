import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import ProductForm from '@/components/admin/ProductForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Produto {
  id: number;
  nome_produto: string;
  descricao_produto: string;
  preco_produto: string;
  quantidade_estoque: number;
  imagem: string | null;
}

const AdminDashboard = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const navigate = useNavigate();
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
        fetchProdutos();
      } catch (error) {
        console.error("Falha ao excluir produto", error);
        alert("Não foi possível excluir o produto.");
      }
    }
  };

  const handleAddNew = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setProductToEdit(produto);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchProdutos();
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
            <Button onClick={handleAddNew} className="mr-4 bg-green-600 hover:bg-green-700">
              Adicionar Novo Produto
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
                  Imagem
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estoque
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {produtos.map(produto => (
                <tr key={produto.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {produto.imagem ? (
                      <img src={produto.imagem} alt={produto.nome_produto} className="h-12 w-12 object-cover rounded-md" />
                    ) : (
                      <div className="h-12 w-12 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">Sem Img</div>
                    )}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.nome_produto}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.quantidade_estoque}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{produto.preco_produto}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
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