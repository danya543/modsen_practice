import './App.css';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from './pages/ErrorPage';
import { MainPage } from './pages/MainPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const App = () => {

  return <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/*" element={<ErrorPage />} />
  </Routes>;
};

export default App;
