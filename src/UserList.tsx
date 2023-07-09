import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Définissez la structure d'un utilisateur
interface User {
    id: number;
    name: string;
    // Ajoutez ici plus de propriétés si nécessaire
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Faire une requête GET à l'API pour obtenir la liste des utilisateurs
        axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                // Mettre à jour l'état du composant avec les données reçues
                setUsers(response.data);
            });
    }, []);

    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {users.map(user =>
                // Pour chaque utilisateur, affichez son nom dans une liste
                <li  key={user.id}>{user.name}</li>
            )}
        </ul>
    );
};

export default UserList;
