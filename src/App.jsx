import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LangTest from './components/LangTest';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import Test from './components/TestNav';
import FormsExample from './pages/FormsExample';
import Home from './pages/Home';

function App() {
  return (
    <Suspense fallback="Loading...">
      <div className="App">
        <a
          href="#main-content"
          className="govuk-skip-link"
          data-module="govuk-skip-link"
        >
          Skip to main content
        </a>
        <Header />
        <div className="govuk-width-container ">
          <main className="govuk-main-wrapper " id="main-content" role="main">
            <Test />
            <LangTest />
            <Routes>
              <Route path="/forms" element={<FormsExample />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
