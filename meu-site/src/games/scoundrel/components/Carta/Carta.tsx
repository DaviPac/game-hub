import { GameCard, Naipe } from "../../models/GameCard";
import styles from "./Carta.module.css";

interface CartaProps {
  carta: GameCard;
  onClick?: (() => void) | null;
  className?: string | null;
  hover?: boolean;
}

const naipeSymbols: Record<Naipe, string> = {
  [Naipe.Copas]: "♥",
  [Naipe.Paus]: "♣",
  [Naipe.Ouros]: "♦",
  [Naipe.Espadas]: "♠",
};

const naipeColors: Record<Naipe, string> = {
  [Naipe.Copas]: "red",
  [Naipe.Ouros]: "#f1c40f",
  [Naipe.Paus]: "black",
  [Naipe.Espadas]: "black",
};

export function Carta({ carta, onClick = null, className = null, hover = false }: CartaProps) {
  const simbolo = naipeSymbols[carta.naipe];
  const cor = naipeColors[carta.naipe];
  const valorTexto = carta.valor === 1 ? "A" :
                     carta.valor === 11 ? "J" :
                     carta.valor === 12 ? "Q" :
                     carta.valor === 13 ? "K" :
                     carta.valor.toString();
  const pass = () => null;

  return (
    <div className={className ? className : styles.container}>
      <div className={hover ? styles.cartaHover : styles.carta} onClick={onClick ? onClick : pass}>
        <div className={styles.topLeft} style={{ color: cor }}>
          {valorTexto} {simbolo}
        </div>
        <div className={styles.center} style={{ color: cor }}>
          {simbolo}
        </div>
        <div className={styles.bottomRight} style={{ color: cor }}>
          {valorTexto} {simbolo}
        </div>
      </div>
    </div>
  );
}
