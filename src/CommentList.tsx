import React from 'react';
import axios from 'axios';

// Définir une interface pour l'état du composant
interface IState {
    comments: any[];
}

class CommentList extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        // Initialiser l'état du composant
        this.state = {
            comments: [],
        };
    }

    componentDidMount() {
        // Faire une demande GET à l'API pour obtenir la liste des commentaires
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                // Mettre à jour l'état du composant avec les données reçues
                const comments = response.data;
                this.setState({ comments });
            });
    }

    render() {
        // Récupérer les commentaires de l'état du composant
        const { comments } = this.state;
        // Afficher la liste des commentaires
        return (
            <ul>
                {comments.map((comment: any) =>
                    // Pour chaque commentaire, afficher son contenu dans une liste
                    <li key={comment.id}>{comment.body}</li>
                )}
            </ul>
        );
    }
}

export default CommentList;
