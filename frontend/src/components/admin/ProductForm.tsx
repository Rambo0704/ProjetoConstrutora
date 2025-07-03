// src/components/admin/ProductForm.tsx

import { useState, useEffect } from 'react';
import api from '@/services/api'; // Nossa instância do Axios
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// --- 1. ATUALIZE A INTERFACE ---
interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: string;
  // Novos campos
  quantidade_estoque: number;
  imagem_url: string;
}

interface ProductFormProps {
  productToEdit?: Produto | null;
  onSuccess: () => void;
}

const ProductForm = ({ productToEdit, onSuccess }: ProductFormProps) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  // --- 2. ADICIONE OS NOVOS ESTADOS ---
  const [quantidadeEstoque, setQuantidadeEstoque] = useState<number | string>(''); // Usar string | number permite o campo ficar vazio
  const [imagemUrl, setImagemUrl] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setNome(productToEdit.nome || '');
      setDescricao(productToEdit.descricao || '');
      setPreco(productToEdit.preco || '');
      // --- 3. PREENCHA OS NOVOS CAMPOS NO MODO DE EDIÇÃO ---
      setQuantidadeEstoque(productToEdit.quantidade_estoque || 0);
      setImagemUrl(productToEdit.imagem_url || '');
    } else {
      setNome('');
      setDescricao('');
      setPreco('');
      // --- 4. LIMPE OS NOVOS CAMPOS NO MODO DE ADIÇÃO ---
      setQuantidadeEstoque('');
      setImagemUrl('');
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // --- 5. INCLUA OS NOVOS DADOS NO OBJETO ENVIADO PARA A API ---
    const productData = {
      nome,
      descricao,
      preco,
      quantidade_estoque: Number(quantidadeEstoque), // Garante que estamos enviando um número
      imagem_url: imagemUrl,
    };

    try {
      if (productToEdit) {
        await api.put(`/produtos/${productToEdit.id}/`, productData);
      } else {
        await api.post('/produtos/', productData);
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
        <Input id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 29,90" required />
      </div>

      {/* --- 6. ADICIONE OS NOVOS CAMPOS NO FORMULÁRIO (JSX) --- */}
      <div className="space-y-2">
        <Label htmlFor="quantidade">Quantidade em Estoque</Label>
        <Input
          id="quantidade"
          type="number"
          value={quantidadeEstoque}
          onChange={(e) => setQuantidadeEstoque(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imagemUrl">URL da Imagem</Label>
        <Input
          id="imagemUrl"
          type="url"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
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