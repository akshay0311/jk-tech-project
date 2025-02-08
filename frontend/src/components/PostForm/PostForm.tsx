import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";
import React from "react";

interface PostFormProps {
  form: {
    title: string;
    content: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const PostForm: React.FC<PostFormProps> = ({ form, handleChange, handleSubmit }) => {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
          Add New Post
        </Typography>

        <Box component="form" role="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Content"
            name="content"
            value={form.content}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
            <Button type="button" variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostForm;
