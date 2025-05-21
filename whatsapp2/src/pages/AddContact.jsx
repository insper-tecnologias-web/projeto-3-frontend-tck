import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function AddContact() {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage({ type: 'error', text: 'Usuário não autenticado.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/add-contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: data.mensagem || 'Contato adicionado com sucesso!' });
        setPhone('');
      } else {
        setMessage({ type: 'error', text: data.erro || data.detail || 'Erro ao adicionar contato.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro de conexão.' });
    }
  };

  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Title>Adicionar Contato</Title>
        <Label htmlFor="phone">Telefone:</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Ex: 11987654321"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit">Enviar</Button>
        {message && <Alert type={message.type}>{message.text}</Alert>}
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Poppins', sans-serif;
`;

const FormContainer = styled.form`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus { border-color: #34b7f1; }
`;

const Button = styled.button`
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background-color: #34b7f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover { background-color: #28a0c5; }
`;

const Alert = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  color: ${({ type }) => (type === 'success' ? '#155724' : '#721c24')};
  background-color: ${({ type }) => (type === 'success' ? '#d4edda' : '#f8d7da')};
  border: 1px solid ${({ type }) => (type === 'success' ? '#c3e6cb' : '#f5c6cb')};
  text-align: center;
  font-size: 0.9rem;
`;
