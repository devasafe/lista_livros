// Menu.tsx
import Link from 'next/link';
import { FC } from 'react';

export const Menu: FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/" className="navbar-brand">Home</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/LivroLista" className="nav-link">Livro Lista</Link>
          </li>
          <li className="nav-item">
            <Link href="/LivroDados" className="nav-link">Adicionar Livro</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
