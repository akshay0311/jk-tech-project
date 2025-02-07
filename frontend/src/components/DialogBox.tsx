import React, { useState, useEffect } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Card, CardContent, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface DialogBoxProps {
  open: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  form: { title: string; content: string };
  handleSubmit: () => void;
}

const DialogBox: React.FC<DialogBoxProps> = ({ open, handleClose, handleChange, form, handleSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Update</Button>
      </DialogActions>
    </Dialog>
  );
};


export default DialogBox
