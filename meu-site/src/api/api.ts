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