import React from "react";
import { useState } from "react";
import UsuarioForm from "./components/UsuarioForm";
import UsuarioList from "./components/UsuarioList";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "cadastro":
        return <UsuarioForm />;
      case "lista":
        return <UsuarioList />;
      case "sobre":
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <h1>Minha Aplicação</h1>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("cadastro")}>Cadastro</button>
        <button onClick={() => setPage("lista")}>Lista</button>
        <button onClick={() => setPage("sobre")}>Sobre</button>
      </nav>

      <div>{renderPage()}</div>
    </div>
  );
}

export default App;
