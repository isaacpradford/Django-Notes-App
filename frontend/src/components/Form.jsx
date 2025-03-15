import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

import React from "react";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const name = method === "login" ? "Login" : "Register";

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        minLength={8}
        required
        autoComplete={method === "login" ? "current-password" : "new-password"}
      />

      {!loading && (
        <button type="submit" className="form-button">
          {name}
        </button>
      )}

      {loading && <LoadingIndicator />}
    </form>
  );
};

export default Form;
