import {Link, Outlet} from 'react-router-dom';
import React, {useState} from 'react';
import Reset from './styles/Reset.css';
import Styles from './styles/Styles.css';
//import GlobalFonts from './fonts/CovesBold.woff2';

function App() {

  return (
    <div className="App">
{/*      <GlobalFonts />
*/}      <Outlet/>
    </div>
  );
}

export default App;