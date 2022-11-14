import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/Form";
import Hero from "./components/Hero";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Hero />} />
          {/* <Route path={`/found`} element={<FoundList />} />  */}
          <Route path={`/found/newitem`} element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
