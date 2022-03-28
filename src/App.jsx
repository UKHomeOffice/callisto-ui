import { Routes, Route } from 'react-router-dom';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <a
        href="#main-content"
        className="govuk-skip-link"
        data-module="govuk-skip-link"
      >
        Skip to main content
      </a>
      <Header />
      <Notes />
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
