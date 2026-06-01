import { useState } from 'react';
import './EditPage.css';
import axiosInstance from '../apis/axiosInstance';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useParams } from 'react-router';

    async function getDetailPost(id, setTitle, setDescription, setAuthor) {
        try {
            const response = await axiosInstance.get('/posts/' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            console.log(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setAuthor(response.data.author);
        } catch (error) {
            console.log(error);
        }
    }
export default function EditPage({ getPost }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/posts/' + id, {
                title,
                description,
                author,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            console.log(response.data);
            window.alert('글이 수정되었습니다.');
            await getPost();
            navigate('/detail/' + id);
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        
        getDetailPost(id, setTitle, setDescription, setAuthor);
    }, [id]);



    return (
        <div className="post-form-container">
            <h2 className="post-form-title">글 쓰기</h2>
            <form
                className="post-form"
                onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label htmlFor="title">제목 *</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">내용 *</label>
                    <textarea
                        id="description"
                        placeholder="내용을 입력하세요"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">작성자 *</label>
                    <input
                        id="author"
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <button className="post-form-submit" type="submit">
                    등록하기
                </button>
            </form>
        </div>
    );
}
