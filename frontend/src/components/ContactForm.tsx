
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome_usuario: "",
    email_usuario: "",
    telefone_usuario: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      
      const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success("Mensagem enviada com sucesso!");
        setFormData({
          nome_usuario: "",
          email_usuario: "",
          telefone_usuario: "",
        });
      } else {
        toast.error("Erro ao enviar mensagem. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast.error("Falha na conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium mb-1">
          Nome completo *
        </label>
        <Input
          id="nome_usuario_usuario"
          name="nome_usuario"
          value={formData.nome_usuario}
          onChange={handleChange}
          required
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <Input
          id="email_usuario"
          name="email_usuario"
          type="email_usuario"
          value={formData.email_usuario}
          onChange={handleChange}
          required
          placeholder="seu@email.com"
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium mb-1">
          Telefone *
        </label>
        <Input
          id="telefone_usuario"
          name="telefone_usuario"
          value={formData.telefone_usuario}
          onChange={handleChange}
          required
          placeholder="(00) 00000-0000"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <Textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          placeholder="Escreva sua mensagem aqui..."
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
};

export default ContactForm;
