import type Letra from "../models/Letra";
import Multiplier, { centro, letraDupla, letraTripla, palavraDupla, palavraTripla } from "../models/Multiplier";
import styles from "./ScrabbleTile.module.css";

export interface ScrabbleTileProps {
    mult: Multiplier;
    letra: Letra | null;
    onClick?: () => any;
    preview?: boolean;
}

function ScrabbleTile({ mult, letra, onClick, preview = false }: ScrabbleTileProps) {
    let tileString;

    switch (mult) {
        case palavraDupla:
            tileString = "Palavra Dupla";
            break;
        case palavraTripla:
            tileString = "Palavra Tripla";
            break;
        case letraDupla:
            tileString = "Letra Dupla";
            break;
        case letraTripla:
            tileString = "Letra Tripla";
    }

    return letra ? (
        <div className={styles.container} onClick={onClick}>
            <div className={preview ? styles.preview : styles.letra}>
                <span className={styles.char}>{letra.char}</span>
                <span className={styles.value}>{letra.value}</span>
            </div>
        </div>
    )
    : (
        <div className={styles.container} onClick={onClick}>
            <div className={ mult === palavraDupla ? styles.palavraDupla
                : mult === palavraTripla ? styles.palavraTripla
                : mult === letraDupla ? styles.letraDupla
                : mult === letraTripla ? styles.letraTripla
                : mult === centro ? styles.centro
                : styles.comum
            }><span className={styles.tileString}>{tileString}</span></div>
        </div>
    );
}

export default ScrabbleTile;