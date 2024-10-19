import { useState } from 'react';
import { Link } from 'react-router-dom';

import onTheGoStyles from './../styles/OnTheGo.css';

import onTheGoBottle from './../images/home-page/on-the-go.png';

export default function OnTheGo(){
    return (
        <div id='on-the-go'>
            <div>
                <img src={onTheGoBottle}/>
            </div>
            <div>
                <h2 className='big'>Take one on the go!</h2>
                <p className='big'>Bottled cold brews are great energy boosts for hiking and other outdoor activities.</p>
                <Link to={'/visit'}><button>Find a Store</button></Link>
            </div>
        </div>
    );
}