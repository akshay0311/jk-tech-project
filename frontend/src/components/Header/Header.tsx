import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
    handleOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleOpen }) => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Blog Post Application
                </Typography>
                {isAuthenticated && window.location.pathname !== '/' && (
                    <>
                        <Button color="inherit" onClick={handleOpen} startIcon={<AddIcon />}>Add Post</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
