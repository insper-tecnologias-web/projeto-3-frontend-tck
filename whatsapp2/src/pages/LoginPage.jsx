import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8000/api/token/", {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                navigate("/chats");
            }
        } catch {
            setError("Senha ou usuário inválido");
        }
    }
    return(
    <Container>

        <Form
            onSubmit={handleLogin}
            >
            <Title>Login</Title>
            <Input
                type="text"
                placeholder="Nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            <Input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <Button type="submit">Login</Button>
        {error && <p>{error}</p>}
        <P style={{ fontSize: "0.8rem", textAlign: "center" }}>
            Não tem uma conta? <Register href="/cadastro" >Registrar</Register>
        </P>
        </Form>
    </Container>
    )
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
`;

const Button = styled.button`
  background-color: #34B7F1;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const Message = styled.p`
  font-size: 1rem;
  text-align: center;
  color: green;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Register = styled.a`
  color: #34B7F1;
  font-weight: bold;
`
const P = styled.p`
  font-size: 0.8rem;
  text-align: center;
`
