import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

// g) Define a assinatura para tratamento das solicitações
export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // h) Obtém o código da editora da URL e converte para número
      const codEditora = parseInt(req.query.codEditora as string, 10);
      
      // Verifica se o código é um número válido
      if (isNaN(codEditora)) {
        res.status(400).json({ error: 'Invalid codEditora parameter' });
        return;
      }

      // h) Obtém o nome da editora através de getNomeEditora
      const nomeEditora = controleEditora.getNomeEditora(codEditora);
      
      // Responde com status 200 e o nome da editora em JSON
      if (nomeEditora) {
        res.status(200).json({ nome: nomeEditora });
      } else {
        res.status(404).json({ error: 'Editora not found' });
      }
    } else {
      // i) Retorna status 405 para métodos não permitidos
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // i) Retorna status 500 em caso de exceção no servidor
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
