import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

// a) Cria uma instância exportável de ControleLivro
export const controleLivro = new ControleLivros();

// b) Define a assinatura para tratamento das solicitações
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // c) Responde com status 200 e a lista de livros no formato JSON
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      // d) Obtém os dados do livro do corpo da requisição e inclui no vetor
      const novoLivro = req.body;
      controleLivro.incluir(novoLivro);
      res.status(200).json({ message: 'Livro incluído com sucesso!' });
    } else {
      // e) Retorna status 405 para métodos não permitidos
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // e) Retorna status 500 em caso de exceção no servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
