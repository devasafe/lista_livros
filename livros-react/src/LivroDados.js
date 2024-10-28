// LivroDados.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivros } from '../src/controle/ControleLivros'; // Importando controlador de livros
import { ControleEditora } from '../src/controle/ControleEditora'; // Importando controlador de editoras

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = () => {
    // Definindo as propriedades de estado
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);

    // Navegação
    const navigate = useNavigate();

    // Obtendo as opções de editoras
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    // Método para tratar a seleção de editoras
    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value)); // Converte o value para number
    };

    // Método para incluir um novo livro
    const incluir = (event) => {
        event.preventDefault(); // Elimina o comportamento padrão do formulário
        const livro = {
            codigo: 0, // Código padrão, será atualizado no controlador
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n') // Separando autores por linha
        };
        controleLivro.incluir(livro); // Chamando o método de inclusão
        navigate('/'); // Navegando para a página de listagem
    };

    return (
        <main>
            <h1>Adicionar Novo Livro</h1>
            <form onSubmit={incluir}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <input 
                        type="text" 
                        id="titulo" 
                        className="form-control" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="resumo" className="form-label">Resumo</label>
                    <textarea 
                        id="resumo" 
                        className="form-control" 
                        value={resumo} 
                        onChange={(e) => setResumo(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="autores" className="form-label">Autores (um por linha)</label>
                    <textarea 
                        id="autores" 
                        className="form-control" 
                        value={autores} 
                        onChange={(e) => setAutores(e.target.value)} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="codEditora" className="form-label">Editora</label>
                    <select 
                        id="codEditora" 
                        className="form-select" 
                        value={codEditora} 
                        onChange={tratarCombo}
                    >
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Adicionar Livro</button>
            </form>
        </main>
    );
};

export default LivroDados; // Exportando o componente por padrão
