// src/pages/DetailPage.jsx
import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './DetailPage.css';
import axios from 'axios';

    async function getDetailPost(id, setPost, navigate) {
        try {
            const response = await axios.get('https://fe-server-production.up.railway.app/posts/' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            setPost(response.data);
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    }

    async function deletePost(id, navigate, getPost) {
        try {
            const response = await axios.delete('https://fe-server-production.up.railway.app/posts/' + id);
            console.log(response.data);
            window.alert('글이 삭제되었습니다.');
            await getPost();
            navigate('/');
        } catch (error) {   
            console.log(error);
        }
    }

export default function DetailPage({ getPost }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);



    useEffect(() => {
        getDetailPost(id, setPost, navigate);
    }, [navigate, id]);



    if (!post) {
        return <div className="detail-loading">로딩 중...</div>;
    }

    return (
        <div className="detail-container">
            <button className="detail-back-button" onClick={() => navigate(-1)}>
                ← 뒤로
            </button>
            <h1 className="detail-title">{post.title}</h1>
            <p className="detail-meta">
                {post.author} · {post.createdAt} · ❤️ {post.likeCount}
            </p>
            <hr className="detail-divider" />
            <p className="detail-description">{post.description}</p>
            <button onClick={() => navigate('/edit/' + id)}>수정</button>
            <button onClick={() => deletePost(id, navigate, getPost)}>삭제 🗑️</button>
        </div>
    );
}
