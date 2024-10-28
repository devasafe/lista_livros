// App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import LivroLista from './LivroLista'; // Importando o componente LivroLista
import LivroDados from './LivroDados'; // Importando o componente LivroDados
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Menu de navegação */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Biblioteca</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Lista de Livros</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dados">Dados do Livro</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Definição das rotas */}
        <Routes>
          <Route path="/" element={<LivroLista />} /> {/* Rota para LivroLista */}
          <Route path="/dados" element={<LivroDados />} /> {/* Rota para LivroDados */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
