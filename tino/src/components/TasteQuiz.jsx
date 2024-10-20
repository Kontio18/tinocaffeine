import { useState } from 'react';
import * as React from 'react'
import { Link } from 'react-router-dom';
import { backendUrl } from './../config';

import TasteQuizStyles from './../styles/TasteQuizStyles.css';
import NavStyles from './../styles/NavStyles.css';
import TasteQuizOne from './../images/taste-quiz/taste-quiz-1.jpg';

export default function TasteQuiz(){

  let [topTwoBlends, setTopTwoBlends] = useState([]);

  let [bitter,setBitter] = useState(50);
  let [vanillaLike,setVanillaLike] = useState(50);
  let [fruity,setFruity] = useState(50);
  let [citrus,setCitrus] = useState(50);
  let [mocha,setMocha] = useState(50);
  let [tangy,setTangy] = useState(50);

  const updateBitter = (e) => {setBitter(e.target.value)};
  const updateVanillaLike = (e) => {setVanillaLike(e.target.value)};
  const updateFruity = (e) => {setFruity(e.target.value)};
  const updateCitrus = (e) => {setCitrus(e.target.value)};
  const updateMocha = (e) => {setMocha(e.target.value)};
  const updateTangy = (e) => {setTangy(e.target.value)};

  const submitTasteQuiz = (e) => {

    fetch(backendUrl+'/tasteQuiz?' + new URLSearchParams({
      bitter: bitter,
      vanillaLike: vanillaLike,
      fruity: fruity,
      citrus: citrus,
      mocha: mocha,
      tangy: tangy,
    }))
    .then((res) => res.json())
    .then((res) => {setTopTwoBlends(res)})
  };

  const Top = () => {
    if(topTwoBlends.length !== 0){
      let blendBoxes = [];
      topTwoBlends.forEach((blend, index) => {
        blendBoxes.push(
          <div key={index} className='y-split half'>
            <div className='blend-figure-cont'>
              <figure>
                <Link to={{pathname: "/blend",search:"?blend="+blend.slug }}>
                  <h2>{blend.name}</h2>
                  <img src={require('./../images/blends/' + blend.slug + '-1.jpg')} alt=''/>
                  <figcaption>
                    <p className='light'>{blend.description}</p>
                  </figcaption>
                </Link>
              </figure>
            </div>
          </div>
        );
      });

    return (
      <div className='blend-figures y-split-parent'>
        <h2>Results</h2>
        {blendBoxes}
        <a className='button' href='#'>Get Free Samples</a>
        <hr style={{width: '50px',margin:'10px auto'}}/>
      </div>);
    }
  };

  return(
    <div className='taste-quiz'>
      <div className='taste-quiz-cont y-split-parent'>
        <div className='y-split fifth taste-quiz-img-left-cont'>
          <img src={TasteQuizOne} className='taste-quiz-left-img' alt=''/>
        </div>
        <div className='y-split four-fifths'>
          <span className='inline'><h2>Taste Quiz</h2><h4>Find your top 2 blends</h4></span>
          <div className='taste-quiz-form y-split-parent'>
            <h4>How do you like your coffee?</h4>
            <label className='taste-quiz-label y-split half'>
              <h5>Bitter</h5>
              <input name='bitter' type='range' onChange={(e)=>{updateBitter(e)}}/>
            </label>
            <label className='taste-quiz-label y-split half'>
              <h5>Vanilla-like</h5>
              <input name='vanilla-like' type='range' onChange={(e)=>{updateVanillaLike(e)}}/>
            </label>
            <br className='taste-quiz-divider'/>
            <label className='taste-quiz-label y-split half'>
              <h5>Fruity</h5>
              <input name='fruity' type='range' onChange={(e)=>{updateFruity(e)}}/>
            </label>
            <label className='taste-quiz-label y-split half'>
              <h5>Citrus</h5>
              <input name='citrus' type='range' onChange={(e)=>{updateCitrus(e)}}/>
            </label>
            <br className='taste-quiz-divider'/>
            <label className='taste-quiz-label y-split half'>
              <h5>Mocha</h5>
              <input name='mocha' type='range' onChange={(e)=>{updateMocha(e)}}/>
            </label>
            <label className='taste-quiz-label y-split half'>
              <h5>Tangy</h5>
              <input name='tangy' type='range' onChange={(e)=>{updateTangy(e)}}/>
            </label>
            <br className='taste-quiz-divider'/>
            <button type='button' onClick={(e)=>{submitTasteQuiz(e)}}>Submit</button>
          </div>
        </div>
      </div>
      <hr className='y-split third' style={{border: 'solid 1px #ffcc7f'}}/>
      <hr className='y-split third' style={{border: 'solid 1px #333'}}/>
      <hr className='y-split third' style={{border: 'solid 1px #f42e59'}}/>
      <Top/>
    </div>
  );
}