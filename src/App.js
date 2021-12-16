import './Sass/main.css';
import Header from './Component/Header/header';
import HomePage from './Pages/HomePage/homePage';
import Footer from './Component/Footer/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
