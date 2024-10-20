import {useState, useEffect} from 'react';
import NewsletterSignUpStyles from './../styles/NewsletterSignUpStyles.css';
import axios from 'axios';
import { backendUrl } from './../config';

export default function NewsletterSignUp(){

  const [newsletterEmailAddress, setNewsletterEmailAddress] = useState('');
  const [newsletterEmailAddressSignUpHeader, setNewsletterEmailAddressSignUpHeader] = useState('Subscribe to Our Newsletter:');

  const handleNewsletterEmailFieldChange = (e) => {
    setNewsletterEmailAddress(e.target.value);
  };

  const handleNewsletterSignUp = (e) => {
    e.preventDefault();
    fetch(backendUrl+'/saveEmail?' + new URLSearchParams({
      address: newsletterEmailAddress,
    }))
    .then((res) => {
      res.text().then((message)=>{
        setNewsletterEmailAddressSignUpHeader(message);
      })
    });
    setNewsletterEmailAddress('');
    e.target.reset();
  }

  return (
    <div className='solo-newsletter-sign-up' style={{ backgroundImage: "url('/images/newsletter/background.jpg')"}}>
      <div className='newsletter-sign-up-container negative'>
        <h3>{newsletterEmailAddressSignUpHeader}</h3>
        <form onSubmit={(e) => {handleNewsletterSignUp(e)}}>
          <input type='email' required name='footer-newsletter-email' onChange={(e)=>{handleNewsletterEmailFieldChange(e)}}/><button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}