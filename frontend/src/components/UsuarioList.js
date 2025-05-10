import React from "react";
import { useEffect, useState } from "react";
import api from "../api";


function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api
      .get("api/usuarios/")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
      });
  }, []);

  return (
<div>
  <h2>Lista de Usuários</h2>
  <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Data de Cadastro</th>
      </tr>
    </thead>
    <tbody>
      {usuarios.map((usuario) => (
        <tr key={usuario.id}>
          <td>{usuario.nome}  </td>
          <td>{usuario.email} </td>
          <td>{usuario.telefone}  </td>
          <td>{usuario.data_cadastro}  </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default UsuarioList;

