import { Link } from "react-router"
import { useAuth } from "../../context/AuthContext"
import styles from "./NavBar.module.css"
import HealthDisplay from "./../HealthDisplay/HealthDisplay"

export function NavBar() {
    const authContext = useAuth();
    return (
        <>
        {authContext?.user && (
            <nav className={styles.navbar}>
                <ul className={styles.navList}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/termo">Termo</Link></li>
                    <li><Link to="/angle">Angle</Link></li>
                    <li><Link to="/scoundrel">Scoundrel</Link></li>
                    <li><button onClick={authContext?.logout}>Sair</button></li>
                    <li><HealthDisplay /></li>
                </ul>
            </nav>
        )}
        </>
  );
}