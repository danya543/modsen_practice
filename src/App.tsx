import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { AppRouter } from './router/AppRouter';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { MainPage } from './pages/MainPage';
/* <Provider store={store}>
      <AppRouter />
    </Provider> */
function App() {
  return (
    <MainPage/>
    );
}

export default App;
