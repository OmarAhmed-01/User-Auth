import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.Jsx';
import Register from './pages/Register';
import Quote from './pages/Quote';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/quote' element={<Quote/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App