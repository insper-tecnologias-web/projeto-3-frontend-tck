import styled from 'styled-components'
function App() {

  return (
    <Container>
      <h1>WhatsApp2</h1>
    </Container>
  )
}

export default App

// O css deverá ser adicionado dessa forma!
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`