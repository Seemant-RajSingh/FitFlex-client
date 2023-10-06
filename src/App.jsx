import { Route, Routes } from 'react-router-dom';
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {


  return (
    <>
      <Routes>

        <Route path={"/auth"} element={<Auth />}></Route>
        <Route path={"/"} element={<Home />}></Route>

      </Routes>

    </>
  )
}

export default App
