import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/loginPage';
import IndexPage from './pages/indexPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

 

function App() {
  return (
  <Routes>
    <Route  path='/' element={<Layout />}> 
      <Route index element={<IndexPage />} /> 
      <Route path='/login' element={ <Login />} />
      <Route path='/register' element={<RegisterPage />} />
    </Route>

  </Routes>

  );
}

export default App;
