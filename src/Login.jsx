import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    // e.preventDefault();
    try {
      const response = await axios.get(
        "http://192.168.37.1:15000/api/auth/windows-auth",
        { withCredentials: true }
      );
      // const response = await axios.get('http://localhost:5000/api/auth/windows-auth', { withCredentials: true });
      // setMessage(response.data.message);
      return response;
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("登录失败");
      }
    }
  };

  useEffect(() => {
    const showToken = async () => {
      const response = await handleLogin();
      if (!response?.data?.user) {
        setTimeout(() => {
          navigate("/demo");
        }, 5000);
      }
      setMessage(response.data);
    };

    showToken();
  }, []);

  return (
    <div>
      <h2>登录页</h2>
      {/* <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form> */}
      {/* <button type="submit" onClick={handleLogin}>Login</button> */}
      {message.token && (
        <>
          <p>登录成功！</p>
          <p>您的用户名：{message.user.displayName}</p>
          <p>所属公司：{message.user.company}</p>
          <p>所在部门：{message.user.department}</p>
        </>
      )}
    </div>
  );
};

export default Login;
