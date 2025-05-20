import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CameraPlus } from "@phosphor-icons/react";

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
  });

  const [photo, setPhoto] = useState(null); 
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(); 
    for (let key in form) {
      formData.append(key, form[key]); 
    }
    if (photo) {
      formData.append("photo", photo); 
    }

    try {
      await axios.post("http://localhost:8000/auth/create-user/", formData, {
        
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      setMessage("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
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
        <PhotoLabel htmlFor="photo">
          <CameraPlus size={32} />
        </PhotoLabel>
        <HiddenInput
          id="photo"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <Input name="name" placeholder="Nome" onChange={handleChange} required />
        <Input name="surname" placeholder="Sobrenome" onChange={handleChange} required />
        <Input name="email" placeholder="Email" onChange={handleChange} type="email" required />
        <Input name="phone" placeholder="Telefone" onChange={handleChange} required />
        <Input name="username" placeholder="Usuário" onChange={handleChange} required />
        <Input name="password" placeholder="Senha" onChange={handleChange} type="password" required />
        <Button type="submit">Cadastrar</Button>
        {message && <Message>{message}</Message>}
      <P style={{ fontSize: "0.8rem", textAlign: "center" }}>
            Já tem uma conta? <Login href="/login" >Login</Login>
        </P>
      </Form>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const HiddenInput = styled.input`
  display: none;
`;

const PhotoLabel = styled.label`
  width: 70px;
  height: 70px;
  border: 2px solid #007BFF;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #007BFF;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  align-self: center; /* Centraliza no Form */
  margin-top: 0.5rem;

  &:hover {
    background-color: #007BFF;
    color: white;
  }
`;

const Login = styled.a`
  color: #34B7F1;
  font-weight: bold;
`

const P = styled.p`
  font-size: 0.8rem;
  text-align: center;
`
