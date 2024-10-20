import { useState, useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { backendUrl } from './../config';

import FooterStyles from './../styles/FooterStyles.css';
import SquareLogo from './../images/logo/square-logo.jpg';

import Instagram from './../images/icons/square-instagram.svg';
import Twitter from './../images/icons/square-twitter.svg';

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer(){

  const [data, setData] = useState([]);
  const [newsletterEmailAddress, setNewsletterEmailAddress] = useState('');
  const [footerNewsletterEmailAddressSignUpHeader, setFooterNewsletterEmailAddressSignUpHeader] = useState('Sign Up For Our Newsletter:');

  const footerHandleNewsletterEmailFieldChange = (e) => {
    setNewsletterEmailAddress(e.target.value);
  };

  function footerHandleNewsletterSignUp(e){
    e.preventDefault();

    fetch(backendUrl+'/saveEmail?' + new URLSearchParams({
      address: newsletterEmailAddress,
    }))
    .then((res) => {
      res.text().then((message)=>{
        setFooterNewsletterEmailAddressSignUpHeader(message)
      })
    });
    setNewsletterEmailAddress('');
    e.target.reset();
  }
  
  return(
    <footer>
      <div className='container y-split-parent'>
        <div className='y-split half'>
          <img src={SquareLogo} className='footer-logo'/>
          <ul className='footer-social-medias'>
            <li>
              <img src={Instagram}/>
            </li>
            <li>
              <img src={Twitter}/>
            </li>
            <li>
              <span>@tinoCaffeine</span>
            </li>
          </ul> 
        </div>
        <div className='y-split half'>
          <ul className='footer-nav'>
            <li><Link to={'/catering'}>Catering</Link></li>
            <li><Link to={'/visit'}>Visit</Link></li>
            <li><Link to={'/blends'}>Blends</Link></li>
            <li><Link to={'/cart'}>Cart</Link></li>
          </ul>
          <div className='newsletter-sign-up-container'>
            <h3>{footerNewsletterEmailAddressSignUpHeader}</h3>
            <form onSubmit={(e) => {footerHandleNewsletterSignUp(e)}}>
            <input type='email' required name='footer-newsletter-email' className='footer' onChange={(e)=>{footerHandleNewsletterEmailFieldChange(e)}}/><button type='submit'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;