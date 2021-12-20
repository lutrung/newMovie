import './Sass/main.css';
import HomePage from './Pages/HomePage/homePage';
import { Switch, Route } from 'react-router-dom';
import HomeTemplates from './Templates/HomeTemplates';
import SignIn from './Pages/User/SignIn';
import SignUp from './Pages/User/SignUp';
import MovieDetails from './Pages/MovieDetails/MovieDetails';

function App() {
  return (
    <div className="App">
      <Switch>
        <HomeTemplates exact path="/" Component={HomePage} />
        <HomeTemplates exact path="/trangchu" Component={HomePage} />
        <HomeTemplates exact path="/chitietphim/:maPhim" Component={MovieDetails} />
        <Route exact path='/dangnhap' component={SignIn} />
        <Route exact path='/dangky' component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
