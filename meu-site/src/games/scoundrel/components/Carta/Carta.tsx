// Carta.tsx
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
  [Naipe.Copas]: "#c62828",
  [Naipe.Ouros]: "#f1c40f",
  [Naipe.Paus]: "#1a1410",
  [Naipe.Espadas]: "#1a1410",
};

const renderFaceCard = (valor: number, simbolo: string, cor: string) => {
  if (valor === 1 || valor === 14) { // Ás
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.ornamentCircle} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke={cor} strokeWidth="1.5" opacity="0.3" strokeDasharray="2,3"/>
          <circle cx="40" cy="40" r="31" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.2"/>
        </svg>
        <div className={styles.centerLarge} style={{ color: cor }}>
          {simbolo}
        </div>
        <div className={styles.smallOrnaments} style={{ color: cor }}>
          <span className={styles.ornamentLeft}>{simbolo}</span>
          <span className={styles.ornamentRight}>{simbolo}</span>
        </div>
      </div>
    );
  }

  if (valor === 13) { // Rei
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 100">
          {/* Manto */}
          <path
            d="M 20 75 Q 20 65, 28 62 L 28 52 Q 40 48, 52 52 L 52 62 Q 60 65, 60 75 L 40 87 Z"
            fill={cor}
            opacity="0.15"
          />
          {/* Coroa */}
          <path
            d="M 23 38 L 27 30 L 31 38 L 35 27 L 39 38 L 43 25 L 47 38 L 51 27 L 55 38 L 59 30 L 63 38 L 63 44 Q 60 47, 55 47 L 31 47 Q 26 47, 23 44 Z"
            fill={cor}
            stroke={cor}
            strokeWidth="1.5"
          />
          {/* Joias */}
          <circle cx="35" cy="29" r="2" fill="#ffd700" opacity="0.8"/>
          <circle cx="43" cy="26" r="2" fill="#ffd700" opacity="0.8"/>
          <circle cx="51" cy="29" r="2" fill="#ffd700" opacity="0.8"/>
          {/* Rosto */}
          <ellipse cx="43" cy="58" rx="13" ry="15" fill={cor} opacity="0.2"/>
          <path d="M 36 62 Q 43 65, 50 62" stroke={cor} strokeWidth="2" fill="none"/>
        </svg>
        <div className={styles.faceSymbol} style={{ color: cor }}>{simbolo}</div>
      </div>
    );
  }

  if (valor === 12) { // Rainha
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 100">
          {/* Vestido */}
          <path
            d="M 25 72 Q 25 62, 33 59 L 33 52 Q 43 48, 53 52 L 53 59 Q 61 62, 61 72 L 57 84 L 29 84 Z"
            fill={cor}
            opacity="0.15"
          />
          {/* Coroa */}
          <path
            d="M 27 42 Q 27 39, 30 37 L 33 34 L 36 37 L 39 32 L 43 37 L 47 32 L 50 37 L 53 34 L 56 37 Q 59 39, 59 42 L 59 46 Q 57 49, 53 49 L 33 49 Q 29 49, 27 46 Z"
            fill={cor}
            stroke={cor}
            strokeWidth="1.5"
          />
          {/* Joias */}
          <circle cx="33" cy="34" r="1.8" fill="#ff69b4" opacity="0.8"/>
          <circle cx="43" cy="31" r="2.2" fill="#ff69b4" opacity="0.9"/>
          <circle cx="53" cy="34" r="1.8" fill="#ff69b4" opacity="0.8"/>
          {/* Rosto */}
          <ellipse cx="43" cy="59" rx="12" ry="14" fill={cor} opacity="0.2"/>
          <path d="M 36 62 Q 43 65, 50 62" stroke={cor} strokeWidth="1.8" fill="none"/>
          {/* Colar */}
          <circle cx="43" cy="70" r="2.5" fill="#ff69b4" opacity="0.6" stroke={cor} strokeWidth="1"/>
        </svg>
        <div className={styles.faceSymbol} style={{ color: cor }}>{simbolo}</div>
      </div>
    );
  }

  if (valor === 11) { // Valete
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 100">
          {/* Túnica */}
          <path
            d="M 27 68 L 27 58 Q 43 54, 59 58 L 59 68 Q 57 80, 51 82 L 35 82 Q 29 80, 27 68 Z"
            fill={cor}
            opacity="0.15"
          />
          {/* Chapéu */}
          <path
            d="M 25 44 L 29 37 L 57 37 L 61 44 L 57 48 L 29 48 Z"
            fill={cor}
            stroke={cor}
            strokeWidth="1.5"
          />
          <rect x="29" y="48" width="28" height="5" fill={cor} rx="1"/>
          {/* Pena */}
          <path
            d="M 55 37 Q 59 32, 62 27 Q 63 30, 62 34 Q 61 36, 59 37"
            fill={cor}
            opacity="0.6"
            stroke={cor}
            strokeWidth="1"
          />
          {/* Rosto */}
          <ellipse cx="43" cy="60" rx="12" ry="13" fill={cor} opacity="0.2"/>
          <path d="M 36 63 Q 43 65, 50 63" stroke={cor} strokeWidth="1.8" fill="none"/>
          {/* Gola */}
          <path d="M 35 72 L 39 74 L 43 73 L 47 74 L 51 72" stroke={cor} strokeWidth="1.5" fill="none"/>
        </svg>
        <div className={styles.faceSymbol} style={{ color: cor }}>{simbolo}</div>
      </div>
    );
  }

  // Cartas numéricas normais
  return (
    <div className={styles.center} style={{ color: cor }}>
      {simbolo}
    </div>
  );
};

export function Carta({ carta, onClick = null, className = null, hover = false }: CartaProps) {
  const simbolo = naipeSymbols[carta.naipe];
  const cor = naipeColors[carta.naipe];
  const valorTexto = carta.valor === 1 ? "A" :
                     carta.valor === 11 ? "J" :
                     carta.valor === 12 ? "Q" :
                     carta.valor === 13 ? "K" :
                     carta.valor === 14 ? "A" :
                     carta.valor.toString();
  const pass = () => null;

  return (
    <div className={className ? className : styles.container}>
      <div className={hover ? styles.cartaHover : styles.carta} onClick={onClick ? onClick : pass}>
        {/* Cantos decorativos */}
        <svg className={styles.cornerDecoration} viewBox="0 0 120 170">
        </svg>

        <div className={styles.topLeft} style={{ color: cor }}>
          <div className={styles.rankText}>{valorTexto}</div>
          <div className={styles.suitText}>{simbolo}</div>
        </div>

        {renderFaceCard(carta.valor, simbolo, cor)}

        <div className={styles.bottomRight} style={{ color: cor }}>
          <div className={styles.rankText}>{valorTexto}</div>
          <div className={styles.suitText}>{simbolo}</div>
        </div>
      </div>
    </div>
  );
}