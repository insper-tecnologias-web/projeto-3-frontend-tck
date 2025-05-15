import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      if (err.response?.data?.erro) {
        setMessage("Erro: " + err.response.data.erro);
      } else {
        setMessage("Erro ao cadastrar.");
      }
    }
  };

  return (
    <>
      <div>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Sobrenome:</label>
            <input name="surname" value={form.surname} onChange={handleChange} required />
          </div>
          <div>
            <label>Telefone:</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}
