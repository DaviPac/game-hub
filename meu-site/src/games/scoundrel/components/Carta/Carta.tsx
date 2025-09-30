import { GameCard, Naipe } from "../../models/GameCard";
import styles from "./Carta.module.css";

interface CartaProps {
  carta: GameCard;
  onClick?: (() => void) | null;
  className?: string | null;
  hover?: boolean;
}

const naipeColors: Record<Naipe, string> = {
  [Naipe.Copas]: "#c62828",
  [Naipe.Ouros]: "#d84315",
  [Naipe.Paus]: "#1a1410",
  [Naipe.Espadas]: "#1a1410",
};

// Componente SVG para cada naipe
const NaipeSVG = ({ naipe, size = 24 }: { naipe: Naipe; size?: number }) => {
  const cor = naipeColors[naipe];
  
  if (naipe === Naipe.Copas) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={cor}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    );
  }
  
  if (naipe === Naipe.Ouros) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={cor}>
        <path d="M12 2L2 12l10 10 10-10L12 2z"/>
      </svg>
    );
  }
  
  if (naipe === Naipe.Paus) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={cor}>
        <circle cx="12" cy="10" r="3.5"/>
        <circle cx="9" cy="14" r="3.5"/>
        <circle cx="15" cy="14" r="3.5"/>
        <path d="M11 15v5h-1v2h4v-2h-1v-5"/>
      </svg>
    );
  }
  
  if (naipe === Naipe.Espadas) {
    return (
      <svg
      width={size}
      height={size}
      viewBox="0 0 511.96 511.96"
      xmlns="http://www.w3.org/2000/svg"
      fill={"black"} // A cor primária é aplicada aqui
    >
      <g>
        {/* Este caminho herda a cor primária da tag <svg> */}
        <path
          d="M302.728,390.351c16.49,15.934,26.368,25.759,55.905,24.541c43.494-1.783,83.871-25.459,106.364-62.729
		c38.78-64.247,17.576-128.53-23.702-166.824L272.705,6.528c-9.507-8.704-24.082-8.704-33.589,0L68.073,185.34
		c-40.13,37.226-57.256,99.037-23.729,161.483c21.283,39.645,61.767,66.357,106.726,68.087c29.281,1.121,40.801-8.66,57.759-24.488
		c4.458-4.167,11.767-1.033,11.767,5.076l0.009,29.987c0,16.172-4.228,32.071-12.253,46.115l-15.519,27.154
		c-3.354,5.888,0.892,13.206,7.671,13.206h110.813c6.78,0,11.034-7.318,7.671-13.206l-15.519-27.154
		c-8.024-14.045-12.244-29.943-12.244-46.115v-30.296C291.226,389.213,298.429,386.202,302.728,390.351"
        />
        {/* Este caminho recebe a cor secundária específica */}
        <path
          fill={"black"}
          d="M427.21,329.362c-8.701,14.419-21.869,26.091-37.482,33.362c-10.397,4.841-21.597,7.606-32.91,8.072
		c-4.871,0.201-8.657,4.312-8.457,9.184c0.201,4.871,4.312,8.657,9.184,8.457c13.661-0.563,27.144-3.891,39.635-9.707
		c18.759-8.735,34.611-22.785,45.145-40.244c19.021-31.51,20.189-64.061,7.087-94.822c-1.911-4.485-7.096-6.573-11.581-4.662
		c-4.485,1.911-6.573,7.096-4.662,11.581C444.131,276.316,443.177,302.911,427.21,329.362z"
        />
      </g>
    </svg>
    );
  }
  
  return null;
};

const renderFaceCard = (valor: number, naipe: Naipe, cor: string) => {
  if (valor === 1 || valor === 14) { // Ás
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.ornamentCircle} viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke={cor} strokeWidth="1.5" opacity="0.3" strokeDasharray="2,3"/>
          <circle cx="40" cy="40" r="31" fill="none" stroke={cor} strokeWidth="0.8" opacity="0.2"/>
        </svg>
        <div className={styles.centerLarge}>
          <NaipeSVG naipe={naipe} size={70} />
        </div>
        <div className={styles.smallOrnaments}>
          <span className={styles.ornamentLeft}><NaipeSVG naipe={naipe} size={12} /></span>
          <span className={styles.ornamentRight}><NaipeSVG naipe={naipe} size={12} /></span>
        </div>
      </div>
    );
  }

  if (valor === 13) { // Rei
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 120">
          {/* Manto */}
          <path
            d="M 25 82 Q 25 72, 33 69 L 33 62 Q 43 58, 53 62 L 53 69 Q 61 72, 61 82 L 57 94 L 29 94 Z"
            fill={cor}
            opacity="0.15"
          />
          {/* Coroa */}
          <path
            d="M 33 38 L 37 30 L 41 38 L 45 27 L 49 38 L 53 25 L 57 38 L 61 27 L 65 38 L 69 30 L 73 38 L 73 44 Q 70 47, 70 47 L 41 47 Q 36 47, 33 44 Z"
            fill={cor}
            stroke={cor}
            strokeWidth="1.5"
            transform="scale(0.8, 1)"
          />
          {/* Joias */}
          <circle cx="35" cy="29" r="2" fill="#ffd700" opacity="0.8"/>
          <circle cx="43" cy="26" r="2" fill="#ffd700" opacity="0.8"/>
          <circle cx="51" cy="29" r="2" fill="#ffd700" opacity="0.8"/>
          {/* Rosto */}
          <ellipse cx="43" cy="58" rx="13" ry="15" fill={cor} opacity="0.2"/>
          <path d="M 36 62 Q 43 65, 50 62" stroke={cor} strokeWidth="2" fill="none"/>
        </svg>
        <div className={styles.faceSymbol}>
          <NaipeSVG naipe={naipe} size={15} />
        </div>
      </div>
    );
  }

  if (valor === 12) { // Rainha
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 120">
          {/* Vestido */}
          <path
            d="M 25 82 Q 25 72, 33 69 L 33 62 Q 43 58, 53 62 L 53 69 Q 61 72, 61 82 L 57 94 L 29 94 Z"
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
        <div className={styles.faceSymbol}>
          <NaipeSVG naipe={naipe} size={15} />
        </div>
      </div>
    );
  }

  if (valor === 11) { // Valete
    return (
      <div className={styles.faceCardContainer}>
        <svg className={styles.faceSvg} viewBox="0 0 80 120">
          {/* Túnica */}
          <path
            d="M 25 82 Q 25 72, 33 69 L 33 62 Q 43 58, 53 62 L 53 69 Q 61 72, 61 82 L 57 94 L 29 94 Z"
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
        <div className={styles.faceSymbol}>
          <NaipeSVG naipe={naipe} size={15} />
        </div>
      </div>
    );
  }

  // Cartas numéricas normais
  return (
    <div className={styles.center}>
      <NaipeSVG naipe={naipe} size={38} />
    </div>
  );
};

export function Carta({ carta, onClick = null, className = null, hover = false }: CartaProps) {
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
          <path d="M 8 8 L 15 8 M 8 8 L 8 15" stroke={cor} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <path d="M 112 8 L 105 8 M 112 8 L 112 15" stroke={cor} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <path d="M 8 162 L 15 162 M 8 162 L 8 155" stroke={cor} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <path d="M 112 162 L 105 162 M 112 162 L 112 155" stroke={cor} strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
        </svg>

        <div className={styles.topLeft} style={{ color: cor }}>
          <div className={styles.rankText}>{valorTexto}</div>
          <div className={styles.suitIcon}>
            <NaipeSVG naipe={carta.naipe} size={15} />
          </div>
        </div>

        {renderFaceCard(carta.valor, carta.naipe, cor)}

        <div className={styles.bottomRight} style={{ color: cor }}>
          <div className={styles.rankText}>{valorTexto}</div>
          <div className={styles.suitIcon}>
            <NaipeSVG naipe={carta.naipe} size={15} />
          </div>
        </div>
      </div>
    </div>
  );
}