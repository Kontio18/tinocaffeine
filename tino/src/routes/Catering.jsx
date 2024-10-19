import NavBar from './../components/NavBar';
import NewsletterSignUp from './../components/NewsletterSignUp';
import Map from './../components/Map';
import Footer from './../components/Footer';

import { Link } from 'react-router-dom';

import CateringStyles from './../styles/CateringStyles.css';
import CateringHero from './../images/catering/catering-hero.gif';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStrokeStar } from '@fortawesome/free-regular-svg-icons';

export default function Catering() {

  return (
    <div className='catering'>
      <NavBar/>
      <div id='hero'>
        <div className='hero-caption'>
          <h2 className='big'>Find the Perfect Coffee</h2>
          <p className='big'>Our selection is big, so we built a quiz to help you find your new favorites.</p>
          <Link to={'/blends'}><button>Take Taste Quiz</button></Link>
        </div>
      </div>
      <main className='catering-main'>
        <ul className='mobile-y-split-parent y-split-parent catering-options'>
          <li className='y-split third'>
            <div>
              <h2>Pay By Consumption</h2>
              <p>Pay afterwards and get unlimited coffee for all attendees</p>
              <button>Reserve</button>
            </div>
            <div className=''>
              <h4>@derekGrata</h4>
              <ul className='mobile-y-split-parent y-split-parent rating-stars'>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
              </ul>
            </div>
            <h5 className='rating-quote'>"glad to not have to overpay"</h5>
          </li>
          <li className='y-split third'>
            <div>
              <h2>Pay Per Ticket</h2>
              <p>Pay beforehand by the amount of attendees.</p>
              <button>Reserve</button>
            </div>
            <div className=''>
              <h4>@EvanHeights</h4>
              <ul className='mobile-y-split-parent y-split-parent rating-stars'>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
              </ul>
            </div>
            <h5 className='rating-quote'>"the numbers were very simple"</h5>
          </li>
          <li className='y-split third'>
            <div>
              <h2>Free Service</h2>
              <p>Attendees pay for their own coffee.</p>
              <button>Reserve</button>
            </div>
            <div className=''>
              <h4>@EStires</h4>
              <ul className='mobile-y-split-parent y-split-parent rating-stars'>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split full-star'><FontAwesomeIcon icon={faSolidStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
                <li className='mobile-y-split y-split'><FontAwesomeIcon icon={faStrokeStar} /></li>
              </ul>
            </div>
            <h5 className='rating-quote'>"never had to worry about the budget"</h5>
          </li>
        </ul>
      </main>
      <NewsletterSignUp/>
      <Map/>
      <Footer/>
    </div>
  );
}