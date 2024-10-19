import NavBar from './../components/NavBar';
import MeetTheTeam from './../components/MeetTheTeam';
import NewsletterSignUp from './../components/NewsletterSignUp';
import Map from './../components/Map';
import Footer from './../components/Footer';

import { Link } from 'react-router-dom';

import VisitStyles from './../styles/VisitStyles.css';

import SquareLogo from './../images/logo/square-logo.jpg';
import Barista from './../images/employees/Barista.jpg';

export default function Visit() {
  return (
    <div>
      <NavBar/>
        <div id='hero' style={{ backgroundImage: "url('/images/visit-hero.jpg')"}}>
          <div className='hero-caption'>
            <h2 className='big'>Find the Perfect Coffee</h2>
            <p className='big'>Our selection is big, so we built a quiz to help you find your new favorites.</p>
            <Link to={'/blends'}><button>Take Taste Quiz</button></Link>
          </div>
        </div>
      <MeetTheTeam/>
      <div className='about-us y-split-parent'>
        <div className='y-split third'>
          <div className='barista-img-holder'>
            <img src={Barista}/>
          </div>
        </div>
        <div className='y-split two-thirds'>
          <div className='about-us-text'>
            <h2>About Us</h2>
            <p>We believe in our people.</p>
            <p className='light'>We're a Cupertino based coffee company, focused on supplying the caffeine that keeps the city moving. We've built a team of talented coffee professionals, with a passion for what we do.</p>
            <p className='light'>We believe in a fair way of conducting business. We hope that every activity contributes to the economic, environmental and social sustainability of our coffee bean sources.</p>
          </div>
        </div>
      </div>
      <NewsletterSignUp/>
      <Map/>
      <Footer/>
    </div>
  );
}