import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ArrowUDownLeft, UserCircle } from "@phosphor-icons/react";


const roomName = 'lobby';

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  
  // WebSocket 
  const socketRef = useRef(null);   // WebSocket socket ref
  const [message, setMessage] = useState('');  // msg input

  // monta e desmonta socket uma vez
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    socketRef.current = ws;
    ws.onopen = () => console.log("WebSocket conectado");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };
    ws.onclose = (e) => console.error('WebSocket fechado inesperadamente', e);
    ws.onerror = (e) => console.error('WebSocket erro', e);
    return () => ws.close();
  }, []);

  const enviar = () => {
    if (!message.trim()) return;
    socketRef.current.send(JSON.stringify({
      message,
      sender: user.id,
      receiver: id,
    }));
    setMessage('');
  }

  ///////////////////////////////////////////////////
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [id, token, navigate]);

  const fetchData = async () => {
    try {
      const contactResponse = await axios.get(
        `http://localhost:8000/api/get-contact/${id}/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setContact(contactResponse.data.contact);
      setUser(contactResponse.data.user);

      const messagesResponse = await axios.get(
        `http://localhost:8000/api/get-messages/?contact_id=${id}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      setMessages(messagesResponse.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Erro ao carregar histórico de mensagens.");
    }
  };

  if (!contact || !user) return <div>Carregando...</div>;

  return (

    <Container>
      <Voltar>
        <ArrowUDownLeft size={32} onClick={() => navigate("/chats")} />
      </Voltar>
      <Header>
        {contact.photo ? (
          <ProfilePhoto>
            <img
              src={`http://localhost:8000${contact.photo}`}
              alt={contact.name}
              style={{ width: "50px", height: "50px" }}
              />
          </ProfilePhoto>
        ) : (
          <ProfilePhoto>
            <UserCircle size={50} weight="fill" />
          </ProfilePhoto>
        )}
        <h2>
          {contact.name} {contact.surname}
        </h2>
      </Header>

      <Messages>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {messages.map((m) => (
          <Message key={m.id} isMe={m.sender === user.id}>
            {m.message}
          </Message>
        ))}
      </Messages>

      <InputArea>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              enviar();
            }
          }}
        />
        <button onClick={enviar}>Enviar</button>
      </InputArea>
    </Container>
  );

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden; 
  font-family: "Poppins", sans-serif;
  margin: 0rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Messages = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 0.5rem;
  overflow-y: auto;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Message = styled.div`
  align-self: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isMe ? "#28a0c5" : "#ddd")};
  color: ${(props) => (props.isMe ? "white" : "black")};
  padding: 0.6rem;
  border-radius: 10px;
  max-width: 60%;
`;

const InputArea = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  padding: 0.5rem;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background-color: #28a0c5;
    color: white;
    padding: 0.75rem 1rem;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 4px;
  }
`;

const Voltar = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #28a0c5;
`;
const ProfilePhoto = styled.div`
  border-radius: 50%;
  overflow: hidden;
    width: 50px;
    height: 50px;
`;