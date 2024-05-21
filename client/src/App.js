import React from 'react';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/loginPage';
import IndexPage from './pages/indexPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';

 

function App() {
  return (
  <Routes>
    <Route  path='/' element={<Layout />}> 
      <Route index element={<IndexPage />} /> 
      <Route path='/login' element={ <Login />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/create' element={<CreatePost /> } />
      <Route path='/posts/:id'element={<PostPage />} />
      <Route path='/edit/:id' element={<EditPost />} />
    </Route>

  </Routes>

  );
}

export default App;
