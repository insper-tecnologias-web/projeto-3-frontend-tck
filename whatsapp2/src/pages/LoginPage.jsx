import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://projeto-3-whatsapp2.onrender.com/api/token/",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/chats");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.erro) {
          setError(data.erro);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError("Erro desconhecido ao fazer login.");
        }
      } else {
        setError("Não foi possível conectar ao servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Title>Login</Title>

        <Input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />

        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processando..." : "Login"}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <P style={{ fontSize: "0.8rem", textAlign: "center" }}>
          Não tem uma conta?{" "}
          <Register href="/cadastro">Registrar</Register>
        </P>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-family: "Poppins", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #28a0c5;
  }
  border: 1px solid #ccc;
  &[disabled] {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background-color: #28a0c5;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;

  &[disabled] {
    background-color: #a0cbd3;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.9rem;
  text-align: center;
  color: #c53030;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Register = styled.a`
  color: #28a0c5;
  font-weight: bold;
`;

const P = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;
