import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

interface Post{
    id : number,
    title : String,
    content : String,
    author : String,
    date : Date
}

interface PostDetailProps {
  posts: Post[];
}

const PostDetail : React.FC<PostDetailProps>= ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <Container>
        <Typography variant="h5" align="center" mt={5}>Post not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Paper elevation={1} sx={{ padding: 4, textAlign: 'left', width: '60%' }}>
        <Typography variant="h3" gutterBottom>{post.title}</Typography>
        <Typography variant="body1" paragraph>{post.content}</Typography>
        <Box mt={2}>
          <Typography variant="subtitle1" color="textSecondary">Author: {post.author || 'Unknown'}</Typography>
          <Typography variant="subtitle2" color="textSecondary">Created on: {new Date(post.date).toDateString() || 'Unknown'}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetail;
