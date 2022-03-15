import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import useGetExample from "./api/getExample";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);
  const test = import.meta.env.VITE_LOCAL_API_URL;

  const { data, error, loading } = useGetExample();

  return (
    <div className='App'>
      <Header />
      <div id='main-content' className='govuk-main-wrapper'>
        <div className='govuk-width-container '>
          <main className='govuk-main-wrapper ' id='main-content' role='main'>
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
