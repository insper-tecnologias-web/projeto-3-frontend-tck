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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "https://projeto-3-whatsapp2.onrender.com/auth/create-user/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Ocorreu um problema ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.erro) {
          setError(data.erro);
        } else if (data.detail) {
          setError(data.detail);
        } else {
          setError("Erro desconhecido ao cadastrar.");
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
      <Form onSubmit={handleSubmit}>
        <Title>Cadastro</Title>

        <PhotoLabel htmlFor="photo" aria-disabled={loading}>
          <CameraPlus size={32} />
        </PhotoLabel>
        <HiddenInput
          id="photo"
          type="file"
          accept="image/*"
          disabled={loading}
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <Input
          name="name"
          placeholder="Nome"
          onChange={handleChange}
          value={form.name}
          required
          disabled={loading}
        />
        <Input
          name="surname"
          placeholder="Sobrenome"
          onChange={handleChange}
          value={form.surname}
          required
          disabled={loading}
        />
        <Input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          type="email"
          required
          disabled={loading}
        />
        <Input
          name="phone"
          placeholder="Telefone"
          onChange={handleChange}
          value={form.phone}
          required
          disabled={loading}
        />
        <Input
          name="username"
          placeholder="Usuário"
          onChange={handleChange}
          value={form.username}
          required
          disabled={loading}
        />
        <Input
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          value={form.password}
          type="password"
          required
          disabled={loading}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processando..." : "Cadastrar"}
        </Button>

        {message && <SuccessMessage>{message}</SuccessMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <P style={{ fontSize: "0.8rem", textAlign: "center" }}>
          Já tem uma conta? <Login href="/login">Login</Login>
        </P>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  font-family: "Poppins", sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  gap: 0.8rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #28a0c5;
  }

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

const SuccessMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  color: green;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #c53030;
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
  border: 2px solid #28a0c5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #28a0c5;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  align-self: center;
  margin-top: 0.5rem;

  &[aria-disabled="true"] {
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    background-color: #28a0c5;
    color: white;
  }
`;

const Login = styled.a`
  color: #28a0c5;
  font-weight: bold;
  text-decoration: none;
`;

const P = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;
