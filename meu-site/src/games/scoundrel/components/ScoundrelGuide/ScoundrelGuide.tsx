import Popup from "../../../../components/Popup/Popup";
import styles from "./ScoundrelGuide.module.css";

export interface ScoundrelGuideProps {
    isOpen: boolean;
    onClose: () => any;
}

function ScoundrelGuide({ isOpen, onClose }: ScoundrelGuideProps) {
    return (
        <Popup isOpen={isOpen} onClose={onClose} closable={true}>
            <div className={styles.scoundrelGuide}>
                <h2>Bem-vindo ao Scoundrel!</h2>
                <p>Clássico jogo dungeon-like de cartas, onde seu objetivo é chegar ao final do baralho vivo.</p>

                <h3>Tipos de Carta</h3>
                <div className={styles.cardTypes}>
                    <div className={`${styles.card} ${styles.heal}`}>♥ Copas: Cura</div>
                    <p>Recupera vida do jogador equivalente ao valor da carta.</p>

                    <div className={`${styles.card} ${styles.monster}`}>♣ Paus / ♠ Espadas: Monstros</div>
                    <p>Diminuem a vida do jogador equivalente ao valor da carta. Cada carta representa um monstro diferente.</p>

                    <div className={`${styles.card} ${styles.weapon}`}>♦ Ouros: Armas</div>
                    <p>
                        Ao atacar um monstro com uma arma, o dano recebido é reduzido de acordo com o valor da arma.
                        A durabilidade da arma diminui conforme a força do monstro.
                    </p>
                </div>

                <h3>Regras do Jogo</h3>
                <div className={styles.ruleScroll}>
                    <ol>
                        <li>
                            O jogo é composto por dungeons, cada uma contendo 4 cartas.
                        </li>
                        <li>
                            Ao se deparar com uma dungeon, você tem 2 opções:
                            <ul>
                                <li>
                                    <strong>Correr:</strong> As cartas serão jogadas para o final do baralho e reaparecerão depois.
                                </li>
                                <li>
                                    <strong>Encarar a dungeon:</strong> Você deve usar 3 das 4 cartas, então 3 novas cartas formam a próxima dungeon.
                                </li>
                            </ul>
                        </li>
                        <li>Não é possível correr em 2 dungeons consecutivas.</li>
                        <li>Não é possível se curar mais de uma vez na mesma dungeon.</li>
                        <li>
                            Ao usar uma arma contra um monstro, a durabilidade da arma cai de acordo com a força do monstro.  
                            (Ex: se a durabilidade cair para 8, só poderá ser usada contra monstros de nível 7 ou menor)
                        </li>
                        <li>Não é possível equipar duas armas ao mesmo tempo. A arma anterior será descartada.</li>
                        <li>Após escolher uma carta, você não pode voltar atrás!</li>
                    </ol>
                </div>
            </div>
        </Popup>
    )
}

export default ScoundrelGuide;