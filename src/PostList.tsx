import React from 'react';
import axios from 'axios';

// Définir une interface pour l'état du composant
interface IState {
    posts: any[];
}

class PostList extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        // Initialiser l'état du composant
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        // Faire une demande GET à l'API pour obtenir la liste des articles
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                // Mettre à jour l'état du composant avec les données reçues
                const posts = response.data;
                this.setState({ posts });
            });
    }

    render() {
        // Récupérer les articles de l'état du composant
        const { posts } = this.state;
        // Afficher la liste des articles
        return (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {posts.map((post: any) =>
                    // Pour chaque article, afficher son titre dans une liste
                    <li key={post.id}>{post.title}</li>
                )}
            </ul>
        );
    }
}

export default PostList;
