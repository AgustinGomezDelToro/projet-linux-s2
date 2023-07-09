import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import PostList from './PostList';
import UserList from './UserList';
import CommentList from './CommentList';
import UserPostsComments from "./UserPostsComments";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="">
                    <h1>Projet Linux S2</h1>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/comments" element={<CommentList />} />
                    <Route path="/userpostscomments" element={<UserPostsComments />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
