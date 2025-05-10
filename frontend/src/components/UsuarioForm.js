import React from "react";
import { useState } from "react";
import api from "../api";


function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("usuarios/", { nome, email, telefone })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setTelefone("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
      });
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
// O código acima é um componente React que implementa um formulário para cadastrar usuários.
// Ele utiliza o hook useState para gerenciar os estados dos campos do formulário (nome, email e telefone).