import styled from 'styled-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <Container>
      <h1>WhatsApp2</h1>
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`