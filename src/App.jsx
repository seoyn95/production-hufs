// App.jsx (DetailPage 라우트 추가)
import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import PostPage from './pages/PostPage';

import { useState } from 'react';
import { useEffect } from 'react';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import axiosInstance from './apis/axiosInstance';

 async function getPost(setPosts) {
        try {
            const response = await axiosInstance.get('/posts');
            console.log(response.data);
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

function App() {
    const [posts, setPosts] = useState([]);

   

    useEffect(() => {
        getPost(setPosts);
    }, []);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage posts={posts} />} />
                <Route path="/detail/:id" element={<DetailPage posts={posts} getPost={getPost} />} />
                <Route path="/write" element={<PostPage getPost={getPost} />} />
                <Route path="/edit/:id" element={<EditPage getPost={getPost} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
    );
}

export default App;
