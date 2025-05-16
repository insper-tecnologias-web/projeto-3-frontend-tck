import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
        await axios.post("http://localhost:8000/auth/create-user/", form);
        setMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/chats"), 2000);
    } catch (err) {
        console.log(err.response); 
        if (err.response?.data?.erro) {
            setMessage("Erro: " + err.response.data.erro);
        } else {
            setMessage("Erro ao cadastrar.");
        }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Cadastro</Title>
        <Input name="username" placeholder="Usuário" onChange={handleChange} required />
        <Input name="email" placeholder="Email" onChange={handleChange} type="email" required />
        <Input name="password" placeholder="Senha" onChange={handleChange} type="password" required />
        <Input name="name" placeholder="Nome" onChange={handleChange} required />
        <Input name="surname" placeholder="Sobrenome" onChange={handleChange} required />
        <Input name="phone" placeholder="Telefone" onChange={handleChange} required />
        <Button type="submit">Cadastrar</Button>
        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
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
