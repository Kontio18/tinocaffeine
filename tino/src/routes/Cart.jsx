import { connect } from 'react-redux';
import tinoStore from './../components/reducers/tinoStore';

import NavBar from './../components/NavBar';
import CartComponent from './../components/CartComponent';

import NewsletterSignUp from './../components/NewsletterSignUp';
import Footer from './../components/Footer';

export default function Cart() {

  return (
    <div>
      <NavBar/>
      <CartComponent/>
      <NewsletterSignUp/>
      <Footer/>
    </div>
  );
}