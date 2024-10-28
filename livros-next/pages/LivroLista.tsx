// LivroLista.tsx
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import{ Menu } from '../classes/componentes/Menu'; // Certifique-se de que o caminho está correto
import {LinhaLivro} from '../classes/componentes/LinhaLivro'; // Certifique-se de que o caminho está correto
import { Livro } from '../classes/modelo/Livro'; // Importa o modelo Livro

const baseURL = "http://localhost:3000/api/livros";

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  // Função para obter os livros da API
  const obter = async () => {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  };

  // Função para excluir um livro
  const excluirLivro = async (codigo: number): Promise<boolean> => {
    const response = await fetch(`${baseURL}/${codigo}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result.ok; // Retorna true se a exclusão foi bem-sucedida
  };

  // Hook para obter os livros quando o componente é montado
  useEffect(() => {
    obter()
      .then(data => {
        setLivros(data);
        setCarregado(true);
      })
      .catch(error => {
        console.error('Erro ao obter livros:', error);
      });
  }, []);

  // Método para excluir livro
  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
      setCarregado(false); // Força o redesenho da página
    } else {
      console.error('Erro ao excluir livro:', codigo);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
      </Head>
      <Menu />
      <main>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)} // Chama a função de excluir
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
