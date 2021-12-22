import './Sass/main.css';
import HomePage from './Pages/HomePage/homePage';
import { Switch, Route } from 'react-router-dom';
import HomeTemplates from './Templates/HomeTemplates';
import SignIn from './Pages/User/SignIn';
import SignUp from './Pages/User/SignUp';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import { Redirect } from 'react-router';
import TicketRoom from './Pages/MovieDetails/TicketRoom-details/TicketRoom';

function App() {
  return (
    <div className="App">
      <Switch>
        <HomeTemplates exact path="/" Component={HomePage} />
        <HomeTemplates exact path="/trangchu" Component={HomePage} />
        <HomeTemplates exact path="/chitietphim/:movieCode" Component={MovieDetails} />
        <Route exact path='/dangnhap' component={SignIn} />
        <Route exact path='/dangky' component={SignUp} />
        <Route exact path='/phongve/:showtimeCode' render={(props) => {
          return localStorage.getItem("USER_SIGNIN") ? <TicketRoom props={props} /> : <Redirect to='/dangnhap' />
        }}></Route>
      </Switch>
    </div>
  );
}

export default App;
