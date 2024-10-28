import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

// h) Define a assinatura para tratamento das solicitações
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      // i) Obtém o código do livro da URL e chama o método excluir
      const codigo = parseInt(req.query.codigo as string, 10);

      if (isNaN(codigo)) {
        res.status(400).json({ error: 'Código inválido' });
        return;
      }

      controleLivro.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso!' });
    } else {
      // j) Retorna status 405 para métodos não permitidos
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // j) Retorna status 500 em caso de exceção no servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
