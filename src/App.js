// import './css/main.css'
import './Sass/main.css'
import './App.css';
import HomePage from './Pages/HomePage/homePage';
import AdminMovieManager from './Pages/Admin/Admin-MovieManager';
import { Switch, Route } from 'react-router-dom';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import { Redirect } from 'react-router';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieList } from './Redux/Actions/MovieManagerActions';
const HomeTemplates = React.lazy(() => import('./Templates/HomeTemplates'));
const AdminTemplates = React.lazy(() => import('./Templates/AdminTemplates'));
const SignIn = React.lazy(() => import('./Pages/User/SignIn'));
const SignUp = React.lazy(() => import('./Pages/User/SignUp'));
const TicketRoom = React.lazy(() => import('./Pages/MovieDetails/TicketRoom-details/TicketRoom'));
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      dispatch(await getMovieList())
    }
    fetchData();
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="App">
      <Suspense fallback={<div className="sk-cube-grid">
        <div className="sk-cube sk-cube1" />
        <div className="sk-cube sk-cube2" />
        <div className="sk-cube sk-cube3" />
        <div className="sk-cube sk-cube4" />
        <div className="sk-cube sk-cube5" />
        <div className="sk-cube sk-cube6" />
        <div className="sk-cube sk-cube7" />
        <div className="sk-cube sk-cube8" />
        <div className="sk-cube sk-cube9" />
      </div>}>
        <Switch>
          <HomeTemplates exact path="/" Component={HomePage} />
          <HomeTemplates exact path="/trangchu" Component={HomePage} />
          <HomeTemplates exact path="/chitietphim/:movieCode" Component={MovieDetails} />
          <Route exact path='/dangnhap' component={SignIn} />
          <Route exact path='/dangky' component={SignUp} />
          <Route exact path='/phongve/:showtimeCode' render={(props) => {
            return localStorage.getItem("USER_SIGNIN") ? <TicketRoom props={props} /> : <Redirect to='/dangnhap' />
          }}></Route>
          <AdminTemplates exact path="/admin" Component={AdminMovieManager} />
          <AdminTemplates exact path="/admin/quanlyphim" Component={AdminMovieManager} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
