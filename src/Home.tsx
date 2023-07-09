import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Bienvenue au projet linux</h1>
            <p>Pour accéder aux différentes routes :</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link to="/users">Liste des utilisateurs</Link></li>
                <li><Link to="/posts">Liste des articles</Link></li>
                <li><Link to="/comments">Liste des commentaires</Link></li>
                <li><Link to="/userpostscomments">Lien entre les différentes données</Link></li>
            </ul>
        </div>
    );
}

export default Home;
