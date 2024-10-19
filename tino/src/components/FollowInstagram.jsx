import { useState } from 'react';

import FollowInstagramStyles from './../styles/FollowInstagramStyles.css';

import FollowInstagram1 from './../images/follow-instagram/1.jpg';
import FollowInstagram2 from './../images/follow-instagram/2.jpg';
import FollowInstagram3 from './../images/follow-instagram/3.jpg';
import FollowInstagram4 from './../images/follow-instagram/4.jpg';
import FollowInstagram5 from './../images/follow-instagram/5.jpg';
import FollowInstagram6 from './../images/follow-instagram/6.jpg';

export default function FollowInstagram(){
    return (
        <div id='follow-instagram'>
            <div className='container vert-half-parent'>
                <div className='vert-half'>
                    <div className='follow-instagram-left-half-container'>
                        <h2>Follow us on Instagram!</h2>
                        <p>Get weekly coupon codes on our Instagram.<br/>@tinocaffeine</p>
                        <button>Visit Page</button>
                    </div>
                </div>
                <div className='vert-half'>
                    <div className='follow-instagram-right-half-container'>
                        <ul className='social-media-box-grid'>
                            <li>
                                <img src={FollowInstagram1}/>
                            </li>   
                            <li>
                                <img src={FollowInstagram2}/>
                            </li>   
                            <li>
                                <img src={FollowInstagram3}/>
                            </li>   
                            <br/>
                            <li>
                                <img src={FollowInstagram4}/>
                            </li>   
                            <li>
                                <img src={FollowInstagram5}/>
                            </li>   
                            <li>
                                <img src={FollowInstagram6}/>
                            </li>   
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}