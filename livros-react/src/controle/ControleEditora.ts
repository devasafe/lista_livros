// ControleEditora.ts

import { Editora } from '../modelo/Editora';

const editoras: Array<Editora> = [
    new Editora(1, "Editora A"),
    new Editora(2, "Editora B"),
    new Editora(3, "Editora C"),
];

export class ControleEditora {
    // Método para retornar todas as editoras
    getEditoras(): Array<Editora> {
        return editoras;
    }

    // Método para retornar o nome da editora dado o código
    getNomeEditora(codEditora: number): string | undefined {
        const editora = editoras.find(e => e.codEditora === codEditora);
        return editora ? editora.nome : undefined; // Retorna o nome ou undefined se não encontrar
    }
}
 export{}