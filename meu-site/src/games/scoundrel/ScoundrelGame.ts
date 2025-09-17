import { Deck } from "./models/Deck";
import { GameCard, Naipe } from "./models/GameCard";

export class ScoundrelGame {
    static maxHp = 20;

    deck: Deck;
    dungeon: GameCard[];
    weapon: GameCard | null;
    weaponLimit: GameCard | null;
    hp: number;
    canRun: boolean;
    canHeal: boolean;
    won: boolean;
    lost: boolean;
    gameOver: boolean;
    started: boolean;
    maxCards: number;
    selectedCard: GameCard | null;

    constructor() {
        this.deck = new Deck();
        this.dungeon = new Array<GameCard>();
        this.weapon = null;
        this.weaponLimit = null;
        this.hp = 20;
        this.canRun = true;
        this.canHeal = true;
        this.won = false;
        this.lost = false;
        this.gameOver = false;
        this.started = false;
        this.maxCards = this.deck.length();
        this.selectedCard = null;
    }

    init() {
        for (let i = 0; i < 4; i++) {
            this.dungeon.push(this.deck.pop());
        }
        this.started = true;
    }

    useCard(cardIdx: number, useWeapon = true) {
        const card = this.dungeon[cardIdx];
        this.dungeon.splice(cardIdx, 1);
        switch (card.naipe) {
            case Naipe.Copas:
                if (this.canHeal) this.hp += card.valor;
                this.canHeal = false;
                this.hp = Math.min(20, this.hp);
                break;

            case Naipe.Ouros:
                this.weapon = card;
                this.weaponLimit = null;
                break;
            case Naipe.Paus:
            case Naipe.Espadas:
                let damage: number;
                if (useWeapon && this.weapon && (!this.weaponLimit || (this.weaponLimit.valor > card.valor))) {
                    damage = Math.max(0, card.valor - this.weapon.valor);
                    this.weaponLimit = card;
                }
                else damage = card.valor;
                this.hp -= damage;
                this.hp = Math.max(0, this.hp);
        }

        this.canRun = false;

        if (this.dungeon.length <= 1) {
            for (let i = 0; i < 3; i++) {
                if (!this.deck.length()) break;
                this.dungeon.push(this.deck.pop());
            }
            if (this.dungeon.length > 1 ) {
                this.canRun = true;
                this.canHeal = true;
            }
        }

        if (this.dungeon.length === 0) {
            this.gameOver = true;
            this.won = true;
        }
        if (this.hp <= 0) {
            this.gameOver = true;
            this.lost = true;
        }
    }

    flee() {
        if (!this.canRun || this.dungeon.length < 4) return;
        for (let i = 0; i < 4; i++) {
            this.deck.push(this.dungeon.pop()!);
        }
        for (let i = 0; i < 4 && this.deck.length(); i++) {
            this.dungeon.push(this.deck.pop());
        }
        this.canRun = false;
    }

    update(): ScoundrelGame {
        return Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this))
    }
}