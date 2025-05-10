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
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.email} - {usuario.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;

