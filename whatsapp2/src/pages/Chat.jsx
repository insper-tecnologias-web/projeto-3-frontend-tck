import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Chat() {
    const { id } = useParams();
    console.log("id do usuário", id);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    const [contact, setContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    
    useEffect(() => {
        if (!token) {
      navigate("/login");
      return;
    }

    fetchData(token);
  }, [id, token, navigate]);

  
    const fetchData = async (token) => {
        console.log(token);
      try {
        const contactResponse = await axios.get(`http://localhost:8000/api/get-contact/${id}/`, {
          headers: { Authorization: `Token ${token}` },
        });

        console.log(contactResponse.data)
        const contato = contactResponse.data.contact
        setContact(contato);
        console.log("contact", contact);
   
        // Aqui futuramente você pode fazer uma requisição real para pegar as mensagens
        setMessages([
          { from: "me", text: "Olá!" },
          { from: "other", text: "Oi, tudo bem?" },
        ]);
      } catch (err) {
        console.log(err);
      }
    };


  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { from: "me", text: newMessage }]);
    setNewMessage("");
  };

  if (!contact) return <div>Carregando...</div>;

  return (
    <Container>
      <Header>
        <Img src={`http://localhost:8000${contact.photo}`} alt="Contact" />
        <h2>{contact.name} {contact.surname}</h2>
      </Header>
      <Messages>
        {messages.map((m, index) => (
          <Message key={index} isMe={m.from === "me"}>
            {m.text}
          </Message>
        ))}
      </Messages>
      <InputArea>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Enviar</button>
      </InputArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Messages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Message = styled.div`
  align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isMe ? "#34B7F1" : "#ddd")};
  color: ${(props) => (props.isMe ? "white" : "black")};
  padding: 0.6rem;
  border-radius: 10px;
  max-width: 60%;
`;

const InputArea = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  padding: 1rem;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
  }

  button {
    background-color: #34B7F1;
    color: white;
    padding: 0.75rem 1rem;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
`;

