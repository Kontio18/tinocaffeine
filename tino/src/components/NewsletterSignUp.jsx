import {useState, useEffect} from 'react';
import NewsletterSignUpStyles from './../styles/NewsletterSignUpStyles.css';
import axios from 'axios';

export default function NewsletterSignUp(){

  const [newsletterEmailAddress, setNewsletterEmailAddress] = useState('');
  const [newsletterEmailAddressSignUpHeader, setNewsletterEmailAddressSignUpHeader] = useState('Subscribe to Our Newsletter:');

  const handleNewsletterEmailFieldChange = (e) => {
    setNewsletterEmailAddress(e.target.value);
  };

  const handleNewsletterSignUp = (e) => {
    e.preventDefault();
    fetch('https://'+window.location.hostname+':3003/saveEmail?' + new URLSearchParams({
      address: newsletterEmailAddress,
    }))
    .then((res) => {
      setNewsletterEmailAddressSignUpHeader('Thanks For Signing Up!');
    });
    setNewsletterEmailAddress('');
  }

  return (
    <div className='solo-newsletter-sign-up' style={{ backgroundImage: "url('/images/newsletter/background.jpg')"}}>
      <div className='newsletter-sign-up-container negative'>
        <h3>{newsletterEmailAddressSignUpHeader}</h3>
        <input type='text' name='footer-newsletter-email' onChange={(e)=>{handleNewsletterEmailFieldChange(e)}}/><button type='button' onClick={(e) => {handleNewsletterSignUp(e)}}>Sign Up</button>
      </div>
    </div>
  );
}