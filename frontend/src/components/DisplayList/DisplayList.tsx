import React from 'react';
import { Typography, Button, Card, CardContent, Box, Stack } from '@mui/material';

interface Post {
  id: number;
  title: string;
  content: string;
  author : string;
  date : string;
}

interface DisplayListProps {
  posts: Post[];
  handleDelete: (id: number) => void;
  handleOpen: (post: Post) => void;
  redirectToPostDetail: (id: string) => void;
}

const DisplayList: React.FC<DisplayListProps> = ({ posts, handleDelete, handleOpen, redirectToPostDetail }) => {
  return (
    <div>
      <Stack spacing={2} direction="row" flexWrap="wrap" justifyContent="center" style={{ marginTop: 20 }}>
        {posts?.map((post) => (
          <Box key={post.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, mb: 2 }}>
            <Card onClick={() => redirectToPostDetail(String(post.id))} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="body2">{post.content.substring(0, 50)}...</Typography>
              </CardContent>
            </Card>
            <Button color="secondary" onClick={() => handleOpen(post)}>Edit</Button>
            <Button color="secondary" onClick={() => handleDelete(post.id)}>Delete</Button>
          </Box>
        ))}
      </Stack>
    </div>
  );
};

export default DisplayList;
