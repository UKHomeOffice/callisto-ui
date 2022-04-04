import { Routes, Route } from 'react-router-dom';
import Checkbox from './components/common/form/checkbox/Checkbox';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import FormsExample from './pages/FormsExample';
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
      <div className="govuk-width-container ">
        <main className="govuk-main-wrapper " id="main-content" role="main">
          <Checkbox text={'Shift longer than 24 hours'} />
          <Routes>
            <Route path="/forms" element={<FormsExample />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
