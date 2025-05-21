import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        method: 'POST',              // ou 'PUT' se seu backend exigir
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
    <div className="add-contact-page">
      <h2>Adicionar Contato</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="phone">Telefone:</label>
        <input
          id="phone"
          type="text"
          placeholder="Ex: 11987654321"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {message && (
        <div className={message.type === 'success' ? 'alert success' : 'alert error'}>
          {message.text}
        </div>
      )}
    </div>
  );
}