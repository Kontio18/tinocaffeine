import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero(){
    return (
        <div id='hero' style={{ backgroundImage: "url('/images/home-hero.jpg')"}}>
            <div className='hero-caption' style={{ left: '10%', top:'50%'}}>
                <h2 className='big'>Find the Perfect Coffee</h2>
                <p className='big'>Our selection is big, so we built a quiz to help you find your new favorites.</p>
                <Link to={'/blends'}><button>Take Taste Quiz</button></Link>
            </div>
        </div>
    );
}