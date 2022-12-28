import axios from 'axios';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Aboutpage from './pages/Aboutpage';
import Articlelistpage from './pages/Articlelistpage';
import Articlepage from './pages/Articlepage';
import Homepage from './pages/Homepage';
import Navbar from './pages/Navbar';
import LoginPage from './pages/LoginPage';
import CreateLogin from './pages/CreateLogin';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>My Awesome blog</h1>
        <Navbar/>
        <div id="page-body">
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/about' element={<Aboutpage/>}/>
            <Route path='/articles' element={<Articlelistpage/>}/>
            <Route path='/articles/:articleId' element={<Articlepage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create' element={<CreateLogin/>}/>
            <Route path='*' element={<div>not here</div>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
     );
}

export default App;

// const respons = await axios.get('http://localhost:3001/api/articles/learn-react/')
// const data = respons.data