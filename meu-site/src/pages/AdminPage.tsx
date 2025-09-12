import { useEffect, useState } from "react";
import * as api from "./../api/api"

function AdminPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await api.getUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {users.map((user: any, index: number) => (
                <div key={index}>
                    {user.username}
                    <button onClick={() => api.deleteUser(user.id).then(async () => setUsers(await api.getUsers()))}>X</button>
                </div>
            ))}
        </div>
    )
}

export default AdminPage;