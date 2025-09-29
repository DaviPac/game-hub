import type ScrabbleGame from "../games/scrabble/ScrabbleGame";

export async function getUsers() {
    return await (await fetch("https://fly-api-proud-surf-8927.fly.dev/users")).json();
}

export async function deleteUser(id: number): Promise<boolean> {
    return await (await fetch(`https://fly-api-proud-surf-8927.fly.dev/users?id=${id}`, {
        method: 'DELETE'
    })).json();
}

export async function login(username: string, password: string) {
    return await (await fetch("https://fly-api-proud-surf-8927.fly.dev/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })).json();
}

export async function register(name: string, username: string, password: string) {
    return await (await fetch("https://fly-api-proud-surf-8927.fly.dev/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password
        })
    })).json();
}

export async function ping(): Promise<boolean> {
    return await (await fetch("https://fly-api-proud-surf-8927.fly.dev/utils/ping")).json();
}

export async function getScrabbleGame(int: number) {
    const board = Array(15).fill(null).map(() => Array(15).fill(null));
    board[7][7] = { char: "F", value: 4 };
    const playerRack = [{ char: "A", value: 1 }]
    const letterBag = [{ char: "A", value: 1 }]
    const playerScore = 5;
    const players = [1];
    return { board: board, turn: int, playerRack: playerRack, playerScore: playerScore, letterBag: letterBag, players: players };
}

export async function saveScrabbleGame(game: ScrabbleGame) {
    const response = await fetch("https://fly-api-proud-surf-8927.fly.dev/scrabble/save", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            'gameId': game.id,

        }
    })
}