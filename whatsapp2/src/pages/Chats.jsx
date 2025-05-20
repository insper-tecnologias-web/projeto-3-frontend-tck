import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PlusCircle, SignOut, UserCircle } from "@phosphor-icons/react";

export default function Chats() {
  const token = localStorage.getItem("token");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetChats();
  }, []);

  const handleGetChats = async () => {
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
    try {
      const response = await axios.get("http://localhost:8000/api/chats/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data.user);
      setChats(response.data.contacts);
    } catch (error) {
      console.error("Erro ao obter chats:", error);
    }
  };

  const handleGetChat = (chatId) => {
    navigate(`/chat/${chatId}`);
  };
  const handleAddContact = () => {
    navigate("/add-contact");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Botões de Sair e Adicionar Contato */}
      {user && (
        <User>
          {user.photo ? (
            <img
              src={`http://localhost:8000${user.photo}`}
              alt={user.name}
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
            />
          ) : (
            <UserCircle size={25} weight="fill" />
          )}
          {user?.name} {user?.surname}
        </User>
      )}
      <Sair onClick={() => handleLogout()}>
        <SignOut size={35} weight="bold" />
      </Sair>
      <AddContact onClick={() => handleAddContact()}>
        <PlusCircle size={50} />
      </AddContact>

      {/* Lista de Contatos */}
      <Container>
        <TitleContainer>
          <Title>Chats</Title>
        </TitleContainer>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Contact key={chat.id} onClick={() => handleGetChat(chat.id)}>
              {chat.photo ? (
                <ProfilePhoto>
                  <img
                    src={`http://localhost:8000${chat.photo}`}
                    alt={chat.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </ProfilePhoto>
              ) : (
                <ProfilePhoto>
                  <UserCircle size={50} weight="fill" />
                </ProfilePhoto>
              )}
              <h2>
                {chat.name} {chat.surname}
              </h2>
            </Contact>
          ))
        ) : (
          <p>Nenhum chat encontrado.</p>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3.5rem;
  font-family: "Poppins", sans-serif;
`;
const TitleContainer = styled.div`
  border-bottom: 3px solid black;
  margin-bottom: 0.5rem;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  text-align: left;
  padding-left: 0.5rem;
  margin-bottom: 0.5rem;
  font-family: "Poppins", sans-serif;
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  margin: 0.15rem 0;
  padding: 0 0.5rem;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 0.8rem;
  gap: 0.5rem;
  font-family: "Poppins", sans-serif;
`;
const User = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
`;

const Sair = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #34b7f1;
`;
const AddContact = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
  color: #34b7f1;
`;
const ProfilePhoto = styled.div`
  border-radius: 50%;
  overflow: hidden;
    width: 50px;
    height: 50px;
`;
