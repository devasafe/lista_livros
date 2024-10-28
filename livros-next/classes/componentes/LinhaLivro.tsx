// Importações necessárias
import React from 'react';
import { Livro } from '../modelo/Livro'; // Ajuste o caminho conforme necessário
import { ControleEditora } from '../controle/ControleEditora'; // Ajuste o caminho conforme necessário

// a) Iniciar com a definição de uma instância de ControleEditora
const controleEditora = new ControleEditora();

// b) Definir a interface LinhaLivroProps
interface LinhaLivroProps {
    livro: Livro; // Atributo livro do tipo Livro
    excluir: () => void; // Método excluir do tipo void
}

// c) Definir o componente exportável LinhaLivro
export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;

    return (
        <tr>
            <td>{livro.codigo}</td>
            <td>{livro.titulo}</td>
            <td>{livro.resumo}</td>
            <td>{livro.autores.join(', ')}</td>
            <td>
                <button onClick={excluir} className="btn btn-danger">
                    Excluir
                </button>
            </td>
        </tr>
    );
};
