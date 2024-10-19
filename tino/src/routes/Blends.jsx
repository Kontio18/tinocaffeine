import React, {useState, useEffect, Fragment} from 'react';
import {Link, Outlet, useSearchParams, useParams} from 'react-router-dom';
import { backendUrl } from './../config';

import axios from 'axios';
import {truncateParagraph} from './../functions';
import NavBar from './../components/NavBar';
import TasteQuiz from './../components/TasteQuiz';
import MeetTheTeam from './../components/MeetTheTeam';
import NewsletterSignUp from './../components/NewsletterSignUp';
import Map from './../components/Map';
import Footer from './../components/Footer';

import BlendsStyles from './../styles/BlendsStyles.css';

import BlendOne from './../images/blends/1.jpg';
import BlendTwo from './../images/blends/2.jpg';

export default function Blends() {
  
const [blends, setBlends] = useState([]);
  useEffect(() => {
    fetch(backendUrl+'/getBlends')
    .then((res) => res.json())
    .then((res) => setBlends(res))
  },[]);

  const too = {pathname: "/blend", param1: "Par1" };
  const DisplayBlendsList = () => {
    let displayBlends = [];

    blends.map((blend, index) => {
      let blendImg = require('./../images/blends/'+blend.page_imgs[0]);
      displayBlends.push(
        <li className='mobile-y-split-parent y-split third' key={index*10}>
          <Link to={{pathname: "/blend",search:"?blend="+blend.name }}>
          <div className='blend-cont'>
            <div className='overlay mobile-y-split third'>
              <div className='img-holder'>
                <img src={blendImg}/>
              </div>
            </div>
            <div className='script underlay mobile-y-split two-thirds'>
              <h4>{blend.name}</h4> 
              <ul className='blend-tags'>
                <li>Tangy</li><span style={{fontSize:'.2rem',verticalAlign:'middle'}}>|</span><li>Bitter</li><span style={{fontSize:'.2rem',verticalAlign:'middle'}}>|</span><li>Sweet</li>
              </ul>
              <p>{truncateParagraph(blend.description, 123)}...</p>
              <h5 className='pricing'>{blend.rates[0].unit} • ${blend.rates[0].price}</h5>
            </div>
          </div>
          </Link>
        </li>
      )
      if((index+1)/3 == Math.floor((index+1)/3) && index > 0) { displayBlends.push(<br key={index*.1} className='disappears-on-mobile'/>) }else{ displayBlends.push(null) }
    })
    return displayBlends;
  }

  return (
    <div>
      <NavBar/>
      <TasteQuiz/>
      <div className='blends-display'>
        <div className='blends-display-wrapper'>
          <h2>Blends</h2>
          <ul className='blends-display y-split-parent'>
          {
            <React.Fragment>
              <DisplayBlendsList/>
            </React.Fragment>
          }
          </ul>
        </div>
      </div>
      <NewsletterSignUp/>
      <Map/>
      <Footer/>
    </div>
  );
}