import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Produto {
  id?: number;
  nome_produto: string;
  descricao_produto: string;
  preco_produto: string;
  quantidade_estoque: number;
  imagem: string;
}

interface ProductFormProps {
  productToEdit?: Produto | null;
  onSuccess: () => void;
}

const ProductForm = ({ productToEdit, onSuccess }: ProductFormProps) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidadeEstoque, setQuantidadeEstoque] = useState<number | string>('');
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setNome(productToEdit.nome_produto || '');
      setDescricao(productToEdit.descricao_produto || '');
      setPreco(productToEdit.preco_produto || '');
      setQuantidadeEstoque(productToEdit.quantidade_estoque || 0);
      setImagemFile(null);
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidadeEstoque('');
      setImagemFile(null);
    }
  }, [productToEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagemFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('nome_produto', nome);
    formData.append('descricao_produto', descricao);
    formData.append('preco_produto', preco.replace(',', '.'));
    formData.append('quantidade_estoque', String(quantidadeEstoque));

    if (imagemFile) {
      formData.append('imagem', imagemFile);
    }

    try {
      if (productToEdit) {
        await api.patch(`/produtos/${productToEdit.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/produtos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      onSuccess();
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      setError('Ocorreu um erro ao salvar o produto. Verifique os campos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome do Produto</Label>
        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preco">Preço</Label>
        <Input id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 29.90" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="quantidade">Quantidade em Estoque</Label>
        <Input id="quantidade" type="number" value={quantidadeEstoque} onChange={(e) => setQuantidadeEstoque(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagem">Imagem do Produto</Label>
        <Input
          id="imagem"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {productToEdit && productToEdit.imagem && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Imagem atual:</p>
            <img src={`http://localhost:8000${productToEdit.imagem}`} alt="Preview" className="h-20 w-20 object-cover rounded-md" />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Produto'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;