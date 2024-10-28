// LivroLista.js

import React, { useState, useEffect } from 'react';
import { ControleLivros } from '../src/controle/ControleLivros'; // Importando controlador de livros
import { ControleEditora } from '../src/controle/ControleEditora'; // Importando controlador de editoras

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

// Componente auxiliar LinhaLivro
const LinhaLivro = ({ livro, excluir }) => {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr key={livro.codigo}>
            <td>{livro.titulo}</td>
            <td>{livro.resumo}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
            <td>{nomeEditora}</td>
            <td>
                <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
        </tr>
    );
};

// Componente LivroLista
const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const fetchLivros = () => {
            const listaLivros = controleLivro.obterLivros();
            setLivros(listaLivros);
            setCarregado(true);
        };

        fetchLivros();
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); // Força o redesenho da página
    };

    return (
        <main>
            <h1>Lista de Livros</h1>
            <table className="table table-striped"> {/* Adicionando classes do Bootstrap */}
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Autores</th>
                        <th>Editora</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro 
                            key={livro.codigo} 
                            livro={livro} 
                            excluir={excluir} 
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
