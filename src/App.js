import './Sass/main.css';
import Header from './Component/Header/header';
import HomePage from './Pages/HomePage/homePage';
import Footer from './Component/Footer/footer';
import { Switch, Route } from 'react-router-dom';
import HomeTemplates from './Templates/HomeTemplates';

function App() {
  return (
    <div className="App">
      <Switch>
        <HomeTemplates exact path="/" Component={HomePage} />
        <HomeTemplates exact path="/trangchu" Component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
