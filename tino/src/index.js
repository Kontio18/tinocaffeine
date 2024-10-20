import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ScrollToTop from "./components/ScrollToTop";

import tinoStore from './components/reducers/tinoStore';

import App from './App';
import Home from './routes/Home';
import Catering from './routes/Catering';
import Visit from './routes/Visit';
import Blends from './routes/Blends';
import Blend from './routes/Blend';
import Cart from './routes/Cart';

import Order from './routes/Order';
import About from './routes/About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={tinoStore}>
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='home' element={<Home/>}></Route>
          <Route path='catering' element={<Catering/>}></Route>
          <Route path='visit' element={<Visit/>}></Route>
          <Route path='blends' element={<Blends/>}></Route>
          <Route path='blend' element={<Blend/>}></Route>
          <Route path='order' element={<Order/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='cart' element={<Cart/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
