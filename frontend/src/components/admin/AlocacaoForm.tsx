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
  }, [alocacaoToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const alocacaoData = {
      nome_cliente: nomeCliente,
      data_inicio: dataInicio,
      data_fim: dataFim,
      local,
      observacoes,
    };

    try {
      if (alocacaoToEdit && alocacaoToEdit.id) {
        await api.put(`/alocacoes/${alocacaoToEdit.id}/`, alocacaoData);
      } else {
        await api.post('/alocacoes/', alocacaoData);
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
