import React from "react";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import GoogleIcon from "@mui/icons-material/Google";

const Login: React.FC = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:3002/auth/google";
  };
  return (
    <div>
      <h1>Login using Google</h1>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: "inline-block" }}
      >
        <Button
          variant="contained"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: "white",
            color: "black",
            textTransform: "none",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            border: "1px solid #ccc",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
            padding: "10px 20px",
          }}
          onClick = {handleLogin}
        >
          Sign in with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default Login;
