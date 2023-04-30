import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Finances from './Components/Finances/Finances';
import Header from './Components/Header';
import Home from './Components/Home/Home';
import Stock from './Components/Stock/Stock';

function App() {
  return (
    <BrowserRouter>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/estoque' element={<Stock/>}/>
        <Route path='/financas' element={<Finances/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
