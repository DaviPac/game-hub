import * as api from "./../api/api";

export async function login(username: string, password: string): Promise<boolean> {
    const result = await api.login(username, password);
    return result;
}

export async function register(name: string, username: string, password: string): Promise<boolean> {
    const result = await api.register(name, username, password);
    return result;
}