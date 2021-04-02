import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';
import 'alertifyjs/build/css/alertify.min.css'

const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

