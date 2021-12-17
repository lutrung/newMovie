import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './Redux/Reducers/rootReducer';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from 'react-router-dom';

const history = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
