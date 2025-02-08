import React from 'react';
import PostForm from '../components/PostForm/PostForm.js';

type CreatePostProps = {
  form: {
    title: string;
    content: string;
    author: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

const CreatePost: React.FC<CreatePostProps> = ({ form, handleChange, handleSubmit }) => {
  return (
    <div>
      <PostForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;

