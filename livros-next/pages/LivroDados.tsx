// LivroDados.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import {Menu} from '../classes/componentes/Menu'; // Certifique-se de que o caminho está correto
import Head from 'next/head';

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados: React.FC = () => {
  const router = useRouter();
  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(0);
  const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);

  // Função para incluir um livro na API
  const incluirLivro = async (livro: Livro): Promise<boolean> => {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livro),
    });
    const result = await response.json();
    return result.ok; // Retorna true se a inclusão foi bem-sucedida
  };

  // Carrega as editoras ao montar o componente
  useEffect(() => {
    const editoras = controleEditora.getEditoras();
    const opcoesMapeadas = editoras.map(editora => ({
      value: editora.codEditora,
      text: editora.nome,
    }));
    setOpcoes(opcoesMapeadas);
  }, []);

  // Método para tratar a mudança do combo de editoras
  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  // Método para incluir livro
  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // Elimina o comportamento padrão do formulário
    const livro: Livro = {
      codigo: 0, // Código zero, pois será atribuído pela API
      codEditora: codEditora,
      titulo: titulo,
      resumo: resumo,
      autores: autores.split('\n'), // Autores separados por linha
    };

    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista'); // Navega para a página LivroLista
    } else {
      console.error('Erro ao incluir livro');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Inclusão de Livro</title>
      </Head>
      <Menu />
      <main>
        <h1 className={styles.title}>Incluir Livro</h1>
        <form onSubmit={incluir}>
          <div>
            <label>Título:</label>
            <input 
              type="text" 
              value={titulo} 
              onChange={e => setTitulo(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Resumo:</label>
            <textarea 
              value={resumo} 
              onChange={e => setResumo(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Autores (separados por linha):</label>
            <textarea 
              value={autores} 
              onChange={e => setAutores(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Editora:</label>
            <select value={codEditora} onChange={tratarCombo}>
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Adicionar Livro</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
