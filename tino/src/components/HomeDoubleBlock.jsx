import { useState } from 'react';

import { Link } from 'react-router-dom';

import DoubleBlockOne from './../images/home-page/double-block-1.jpg';
import DoubleBlockTwo from './../images/home-page/double-block-2.jpg';

export default function HomeDoubleBlock(){
    return (
        <div className='home-double-block-cont'  style={{margin:'auto'}}>
        <div className='y-split-parent'>
            <div className='y-split-parent y-split half' style={{whiteSpace: 'nowrap', padding:'20px'}}>
                <div className='y-split half'>
                  <img src={DoubleBlockOne} style={{width: '100%'}}/>
                </div>
                <div className='y-split half'>
                  <h2 style={{whiteSpace: 'normal',textDecoration:'none',borderBottom: 'solid 1px #111',fontWeight:'400'}}>Explore Your Options</h2>
                  <p style={{whiteSpace: 'normal'}}>Our selection is big, so we built a quiz to help you find your new favorites.</p>
                  <Link to={'/blends'}><button style={{whiteSpace: 'normal'}}>Take Taste Quiz</button></Link>
                </div>
            </div>
            <div className='y-split-parent y-split half' style={{whiteSpace: 'nowrap', padding:'20px'}}>
                <div className='y-split half'>
                  <img src={DoubleBlockTwo} style={{width: '100%'}}/>
                </div>
                <div className='y-split half'>
                  <h2 style={{whiteSpace: 'normal',textDecoration:'none',borderBottom: 'solid 1px #111',fontWeight:'400'}}>Order Ahead</h2>
                  <p style={{whiteSpace: 'normal'}}>We offer multiple catering plans, and can work with a budget as low as $0.</p>
                  <Link to={'/blends'}><button style={{whiteSpace: 'normal'}}>Schedule Catering</button></Link>
                </div>
            </div>
        </div>
        </div>
    );
}