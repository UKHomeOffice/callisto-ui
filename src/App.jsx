import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import useGetExample from "./api/getExample";
import Header from "./components/layout/header/Header";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);
  const test = import.meta.env.VITE_LOCAL_API_URL;

  const { data, error, loading } = useGetExample();

  return (
    <div className='App'>
      <Header />
      <div className='govuk-main-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
