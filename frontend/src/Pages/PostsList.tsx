import React, { useEffect } from 'react'
import DisplayList from '../components/DisplayList.tsx';
import { useNavigate } from 'react-router-dom';


interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface PostDetailProps {
  posts: Post[];
  handleDelete: (id: number) => void;
  handleOpen: (post: Post) => void;
}

const PostsList : React.FC<PostDetailProps>= ({posts, handleDelete, handleOpen}) => {
  const navigate = useNavigate();

  const redirectToPostDetail = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div>
        <DisplayList
        posts={posts}
        handleDelete={handleDelete}
        handleOpen={handleOpen}
        redirectToPostDetail={redirectToPostDetail}
        />
    </div>
  )
}

export default PostsList
