import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';

import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { CssBaseline } from '@material-ui/core';
import { loadGigs, loadUsers } from './reducers/actions';



const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(loadGigs())
store.dispatch(loadUsers())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
