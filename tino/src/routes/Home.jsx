import NavBar from './../components/NavBar';
import Hero from './../components/Hero';
import HomeDoubleBlock from './../components/HomeDoubleBlock';
import OnTheGo from './../components/OnTheGo';
import FollowInstagram from './../components/FollowInstagram';
import Map from './../components/Map';
import Footer from './../components/Footer';

import HomeStyles from '../styles/HomeStyles.css';

export default function Home() {
  return (
    <div id='home-body'>
        <NavBar/>
        <Hero/>
        <HomeDoubleBlock/>
        <OnTheGo/>
        <FollowInstagram/>
        <Map/>
        <Footer/>
    </div>
  );
}