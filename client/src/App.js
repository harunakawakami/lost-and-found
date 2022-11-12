import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={`/`} element={<Home />} />
        <Route path={`/found`} element={<FoundList />} /> */}
        <Route path={`/found/newitem`} element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
