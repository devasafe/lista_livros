// Importações necessárias
import Head from 'next/head';
import React from 'react';
import { Menu } from '../../livros-next/classes/componentes/Menu'; // Ajuste o caminho conforme necessário
import styles from '../styles/Home.module.css'; // Ajuste o caminho conforme necessário

const Home: React.FC = () => {
    return (
        <div className="container">
            {/* b) Alterar title para "Loja Next" */}
            <Head>
                <title>Loja Next</title>
            </Head>
            {/* c) Acrescentar um componente Menu */}
            <Menu />
            {/* d) Definir a área principal (main) */}
            <main className={styles.main}>
                <h1 className={styles.title}>Página Inicial</h1>
            </main>
            {/* e) Apagar todo o restante da página original */}
        </div>
    );
};

export default Home;
