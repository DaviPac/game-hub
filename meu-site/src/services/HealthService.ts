import { useEffect, useState } from "react";
import { ping } from "../api/api";

export enum ApiHealth {
    offline = "offline",
    starting = "starting",
    online = "online"
}

export function usePingInterval(interval: number = 60_000) {
    const [online, setOnline] = useState(ApiHealth.starting);

    const doPing = async () => {
        console.log("pinging");
        try {
            await ping();
            setOnline(ApiHealth.online);
        } catch {
            setOnline(ApiHealth.offline);
        }
    };

    useEffect(() => {
        doPing();

        const pingInterval = setInterval(doPing, interval);

        return () => clearInterval(pingInterval);
    }, [interval]);

    return online;
}