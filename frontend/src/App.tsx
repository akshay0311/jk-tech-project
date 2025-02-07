import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import { getPosts, createPost, deletePost, updatePost } from './helper/operations.ts';
import Dashboard from "./Pages/PostsList.tsx";
import Login from './Pages/Login.tsx';
import PostsDetail from './Pages/PostDetail.tsx';
import CreatePost from './Pages/CreatePost.tsx';
import ProtectedRoute from './ProtectedRoute.tsx';
import DialogBox from './components/DialogBox.tsx';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

const App: React.FC = () => {
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<{ title: string; content: string; author: string }>({
    title: '',
    content: '',
    author: ''
  });
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpen = () => {
    window.location.href = "/create-post";
  };

  const handleOpenDialog = (post: Post) => {
    setCurrentPost(post);
    setForm({ title: post.title, content: post.content, author: post.author });
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (currentPost) {
      try {
        const updatedForm = await updatePost(currentPost.id, form);
        setPosts(posts.map(post => post.id === currentPost.id ? { ...currentPost, ...updatedForm } : post));
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newForm = await createPost(form);
        setPosts([...posts, { id: Date.now(), ...newForm }]);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Header handleOpen={handleOpen} />
      <DialogBox
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute path="/dashboard">
                <Dashboard posts={posts} handleDelete={handleDelete} handleOpen={handleOpenDialog} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute path="">
                <PostsDetail posts={posts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <ProtectedRoute path="/create-post">
                <CreatePost form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
