import { useState, useEffect } from 'react';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Alocacao {
  id?: number;
  nome_cliente: string;
  data_inicio: string;
  data_fim: string;
  local: string;
  observacoes: string;
  imagem_alocacao: string;
}

interface AlocacaoFormProps {
  alocacaoToEdit?: Alocacao | null;
  onSuccess: () => void;
}

const AlocacaoForm = ({ alocacaoToEdit, onSuccess }: AlocacaoFormProps) => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [local, setLocal] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Novo estado apenas para o arquivo de imagem
  const [imagemAlocacaoFile, setImagemAlocacaoFile] = useState<File | null>(null);

  useEffect(() => {
    if (alocacaoToEdit) {
      setNomeCliente(alocacaoToEdit.nome_cliente || '');
      setDataInicio(alocacaoToEdit.data_inicio || '');
      setDataFim(alocacaoToEdit.data_fim || '');
      setLocal(alocacaoToEdit.local || '');
      setObservacoes(alocacaoToEdit.observacoes || '');
    } else {
      setNomeCliente('');
      setDataInicio('');
      setDataFim('');
      setLocal('');
      setObservacoes('');
    }
    // Sempre resetar o arquivo de imagem quando mudar a alocação
    setImagemAlocacaoFile(null);
  }, [alocacaoToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Usar FormData para suportar envio de arquivo
    const formData = new FormData();
    formData.append('nome_cliente', nomeCliente);
    formData.append('data_inicio', dataInicio);
    formData.append('data_fim', dataFim);
    formData.append('local', local);
    formData.append('observacoes', observacoes);
    
    // Adicionar imagem se existir
    if (imagemAlocacaoFile) {
      formData.append('imagem_alocacao', imagemAlocacaoFile);
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (alocacaoToEdit && alocacaoToEdit.id) {
        await api.put(`/alocacoes/${alocacaoToEdit.id}/`, formData, config);
      } else {
        await api.post('/alocacoes/', formData, config);
      }
      onSuccess();
    } catch (err) {
      console.error('Erro ao salvar alocação:', err);
      setError('Erro ao salvar. Verifique os dados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome_cliente">Nome do Material</Label>
        <Input
          id="nome_cliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="data_inicio">Data de Início</Label>
        <Input
          id="data_inicio"
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="data_fim">Data de Término</Label>
        <Input
          id="data_fim"
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="local">Local</Label>
        <Input
          id="local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>

      {/* Novo campo simples para upload de imagem */}
      <div className="space-y-2">
        <Label htmlFor="imagem_alocacao">Imagem da Alocação</Label>
        <Input
          id="imagem_alocacao"
          type="file"
          accept="image/*"
          onChange={(e) => setImagemAlocacaoFile(e.target.files?.[0] || null)}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar Alocação'}
        </Button>
      </div>
    </form>
  );
};

export default AlocacaoForm;