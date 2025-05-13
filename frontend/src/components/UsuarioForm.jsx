import React, { useState } from "react";
import api from "../api";

function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/api/usuarios/", {
        nome,
        email,
        telefone,
      });

      alert("Usuário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setTelefone("");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      console.log("Detalhes do erro:", error.response ? error.response.data : "Erro sem resposta");
      alert("Erro ao cadastrar usuário. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default UsuarioForm;
