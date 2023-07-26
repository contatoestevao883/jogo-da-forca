import { styled } from "styled-components";
import Jogo from "./components/Jogo";
import Letras from "./components/Letras";
import ContextProvider from "./context/context-api";


function App() {
  return (
    <ContextProvider>
      <DivContainer>
        <Jogo />
        <Letras />
      </DivContainer>
    </ContextProvider>
  )
}

export default App;

const DivContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`