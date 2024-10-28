// ControleLivros.ts

import { Livro } from '../modelo/Livro';

const livros: Array<Livro> = [
    new Livro(1, 1, "Livro A", "Resumo do Livro A", ["Autor A"]),
    new Livro(2, 2, "Livro B", "Resumo do Livro B", ["Autor B"]),
    new Livro(3, 3, "Livro C", "Resumo do Livro C", ["Autor C"]),
];

export class ControleLivros {
    // Método para retornar todos os livros
    obterLivros(): Array<Livro> {
        return livros;
    }

    // Método para incluir um novo livro
    incluir(livro: Livro): void {
        const novoCodigo = livros.length > 0 ? Math.max(...livros.map(l => l.codigo)) + 1 : 1;
        livro.codigo = novoCodigo; // Atualiza o código do novo livro
        livros.push(livro); // Adiciona o livro ao vetor
    }

    // Método para excluir um livro pelo código
    excluir(codigo: number): void {
        const indice = livros.findIndex(l => l.codigo === codigo);
        if (indice !== -1) {
            livros.splice(indice, 1); // Remove o livro do vetor
        }
    }
}
export{}