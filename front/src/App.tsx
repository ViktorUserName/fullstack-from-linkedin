import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Aboutpage from './pages/Aboutpage';
import Articlelistpage from './pages/Articlelistpage';
import Articlepage from './pages/Articlepage';
import Homepage from './pages/Homepage';
import Navbar from './pages/Navbar';

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
            <Route path='*' element={<div>not here</div>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
     );
}

export default App;
