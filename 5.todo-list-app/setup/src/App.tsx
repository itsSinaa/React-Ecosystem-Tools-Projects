import AddTodoFrom from "./components/AddTodoFrom";
import Header from "./components/Header";
import { TodosContainer } from "./components/TodosContainer";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Container>
        <AddTodoFrom />
        <TodosContainer />
      </Container>
    </>
  );
}

export default App;
