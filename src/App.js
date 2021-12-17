import './Sass/main.css';
import Header from './Component/Header/header';
import HomePage from './Pages/HomePage/homePage';
import Footer from './Component/Footer/footer';
import { Routes, Route } from 'react-router-dom';
import HomeTemplates from './Templates/HomeTemplates';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/trangchu" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
