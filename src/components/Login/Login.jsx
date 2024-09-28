import { Button, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../../contexts/userContext";
import { loginUser } from "../../services/authService";
import RegisterUser from "../Register/RegisterUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password, role);//login api
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      alert("Error logging in user");
    }
  };

  const LoginContainer = () => {
    return (
      <div className="ecom-login-container">
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          size="small"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          size="small"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className="ecom-btn-primary" variant="outlined" onClick={handleLogin}>
          Login
        </Button>
      </div>
    );
  };

  return (
    <div className="ecom-login-register-container">
      <div className="ecom-login-register-option">
        {!isLogin ? (
          <Typography
            className="typo-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(true)}
          >
            Login
          </Typography>
        ) : (
          ""
        )}
        {isLogin ? (
          <Typography
            className="typo-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(false)}
          >
            Register
          </Typography>
        ) : (
          ""
        )}
      </div>
      {isLogin ? <LoginContainer /> : <RegisterUser />}
    </div>
  );
};

export default Login;
