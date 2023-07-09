import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Définition des types d'objets User, Post et Comment pour le typage TypeScript
interface User {
    id: number;
    name: string;
}

interface Post {
    id: number;
    userId: number;
    title: string;
}

interface Comment {
    id: number;
    postId: number;
    body: string;
}

// Déclaration du composant UserPostsComments
const UserPostsComments: React.FC = () => {
    // Utilisation du hook d'état de React pour gérer les utilisateurs, les publications et les commentaires
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    // Utilisation du hook d'effet de React pour effectuer des requêtes GET vers l'API à la première renderisation du composant
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => setUsers(response.data));  // Mise à jour de l'état des utilisateurs
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data));  // Mise à jour de l'état des publications
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => setComments(response.data));  // Mise à jour de l'état des commentaires
    }, []);

    // Rendu du composant
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    {posts
                        .filter(post => post.userId === user.id)  // Filtre les publications qui appartiennent à l'utilisateur actuel
                        .map(post => (
                            <div key={post.id}>
                                <h3>{post.title}</h3>
                                {comments
                                    .filter(comment => comment.postId === post.id)  // Filtre les commentaires qui appartiennent à la publication actuelle
                                    .map(comment => (
                                        <p key={comment.id}>{comment.body}</p>
                                    ))}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default UserPostsComments;  // Export du composant pour être utilisé ailleurs dans l'application


