import { Link } from "react-router"
import { useAuth } from "../../context/AuthContext"
import styles from "./NavBar.module.css"
import HealthDisplay from "./../HealthDisplay/HealthDisplay"
import { useState } from "react"

export function NavBar() {
    const authContext = useAuth();
    const [menuOpen, setMenuOpen] = useState(false); // 2. Crie o estado para o menu

    return (
        <>
        {authContext?.user && (
            <nav className={styles.navbar}>
                {/* 3. Botão Hambúrguer (só aparece no mobile) */}
                <div 
                    className={styles.hamburger} 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    &#9776; {/* Este é o caractere para o ícone de hambúrguer */}
                </div>

                {/* 4. Adicione uma classe 'open' quando o menu estiver aberto */}
                <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
                    <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/termo" onClick={() => setMenuOpen(false)}>Termo</Link></li>
                    <li><Link to="/angle" onClick={() => setMenuOpen(false)}>Angle</Link></li>
                    <li><Link to="/scoundrel" onClick={() => setMenuOpen(false)}>Scoundrel</Link></li>
                    {/*<li><Link to="/scrabble" onClick={() => setMenuOpen(false)}>Scrabble</Link></li>*/}
                    <li><button onClick={() => {
                        authContext?.logout();
                        setMenuOpen(false);
                    }}>Sair</button></li>
                    <li><HealthDisplay /></li>
                </ul>
            </nav>
        )}
        </>
    );
}