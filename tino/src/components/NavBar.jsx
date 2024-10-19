import { useState, useLayoutEffect } from 'react';
import * as React from 'react'
import {Link, Outlet} from 'react-router-dom';

import CommonStyles from './../styles/Common.css';
import NavStyles from './../styles/NavStyles.css';
import NavLogo from './../images/logo/nav-logo.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


export default function NavBar(){
  let [displayNavLinks, setDisplayNavLinks] = useState(false);

  const searchIcon = <FontAwesomeIcon icon={faX}/>
  const menuIcon = displayNavLinks ? <FontAwesomeIcon icon={faX}/> : <FontAwesomeIcon icon={faBars}/>; 

  const [isDesktop, setDesktop] = useState(window.innerWidth > 750);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 750);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const toggleResponsiveMenu = () => {
    setDisplayNavLinks((prev) => { return prev == false ? true : false; });
  }

  const [navLinks, setNavLinks] = useState([]);

  useLayoutEffect(() => {
    fetch('https://'+window.location.hostname+':3003/navItems')
    .then((res) => res.json())
    .then((res) => setNavLinks(res.link_names))
  },[]);

  const RenderNavList = () => {
    if(displayNavLinks || isDesktop){
      return <ul className='nav-bar-ul'>
        <li><Link to={'/catering'}>Catering</Link></li>
        <li><Link to={'/visit'}>Visit</Link></li>
        <li><Link to={'/blends'}>Blends</Link></li>
        <li><Link to={'/cart'}>Cart</Link></li>
      </ul>
    }
  }

  const RenderNavButton = () => {
    if(!isDesktop){
      return <div id='toggle-nav-menu-button' onClick={() => {toggleResponsiveMenu()}}>{menuIcon}</div>;
    }
  }

  return(
    <React.Fragment>
      <header>
        <nav className='header-nav'>
          <div className='half-parent-div'>
              <div className='half-child-div'>
                <h1><Link to={'/home'}><img className='header-nav-logo' src={NavLogo}/></Link></h1>
              </div>
              <div className='half-child-div'>
                <RenderNavList/>
                <RenderNavButton/>
              </div>
          </div>
        </nav>
        <Outlet/>
      </header>
    </React.Fragment>
  );
}