import React, { useState, useLayoutEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { backendUrl } from './../config';

import tinoStore from './../components/reducers/tinoStore';

import NavBar from './../components/NavBar';
import NewsletterSignUp from './../components/NewsletterSignUp';
import Map from './../components/Map';
import Footer from './../components/Footer';

import BlendStyles from './../styles/BlendStyles.css';

import DefaultBlendImg from './../images/blends/1.jpg';
import axios from 'axios';

export default function Blend() {

  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState(0);
  const [weight, setWeight] = useState('');
  const [blend, setBlend] = useState({});
  
  const [relatedBlends, setRelatedBlends] = useState([]);
  const [searchParams] = useSearchParams();
  

  useLayoutEffect(() => {
    fetch(backendUrl+'/getRelatedBlends?' + new URLSearchParams({
      slug: blend.slug,
      bitter: blend.bitter,
      vanillaLike: blend.vanillaLike,
      fruity: blend.fruity,
      citrus: blend.citrus,
      mocha: blend.mocha,
      tangy: blend.tangy,
    }))
    .then((res) => res.json())
    .then((res) => {setRelatedBlends(res)});
  },[blend]);

  const blendSlug = searchParams.get('blend');  
  const [activeBlendImg, setActiveBlendImg] = useState(DefaultBlendImg);
  
  useLayoutEffect(() => {
   function request() {
      const fetchdata = async () => await axios.get(backendUrl+'/getBlend?blend='+blendSlug);
      const result = fetchdata();
      result.then(res=>{
        setBlend(res.data);
        setWeight(res.data.rates[0].unit);
      })
    }
    request();
  }
  ,[blendSlug]);

  useLayoutEffect(()=>{
    if(blend.slug){
      setActiveBlendImg(require('./../images/blends/'+blend.slug+'-1.jpg'));
    }else{
      setActiveBlendImg(DefaultBlendImg);
    }
  },[blend.slug]);

  const BlendPictures = () => {
    
    let listOfBlendPictures = [];

    if(blend.page_imgs !== undefined){
      blend.page_imgs.forEach((item, index) => {
        let blendImg = require('./../images/blends/'+item);
        listOfBlendPictures = [...listOfBlendPictures, <li key={index}><img onClick={()=>{setActiveBlendImg(blendImg)}} src={blendImg} alt=''/></li>];
      })
      return (listOfBlendPictures);
    }
  }

  const DisplayBlendRates = () => {
    let blendRates = [];
    if(blend.rates !== undefined){
      blend.rates.forEach((rate,index)=>{
        blendRates.push(<option key={rate.id}>{rate.unit}</option>);
      })
      return(blendRates);
    }
  }

  const incrementQuantity = (incNumber) => {
    if(quantity + incNumber >= 0){
      setQuantity(prev => (prev + incNumber));
    }
  }

  const changeWeight = (e) => {
    setWeight(e.target.value);
  }

  useLayoutEffect(() => {
    // calculate cost
    if(blend.rates !== undefined && weight !== undefined){
      let weightPrice = blend.rates.find(rate => rate.unit === weight).price;
      setCost(weightPrice*quantity);
    }
  },[weight, quantity, blend.rates]);

  const addToCart = () => {
    tinoStore.dispatch({
      type: 'ADD_TO_CART',
      quan: quantity,
      item: {name:blend.name,slug:blend.slug, weight: weight, count: quantity, price: cost/quantity}
    })
    setQuantity(0);
  }

  const addFreeSamplesToCart = () => {
    tinoStore.dispatch({
      type: 'ADD_TO_CART',
      quan: 1,
      item: {name:'Free Samples', weight: '4 bags', count: 1, price: 0}
    })
  }

  const RelatedBlendsComponent = () => {
    if(relatedBlends.length !== 0){
      let blendBoxes = [];
      relatedBlends.forEach((blend, index) => {
        var img = require('./../images/blends/'+blend.page_imgs[0]);
        blendBoxes.push(
          <div key={blend._id} className='y-split half'>
            <div className='blend-figure-cont'>
              <figure>
                <Link to={{pathname: "/blend", search:"?blend="+blend.slug }}>
                  <h2>{blend.name}</h2>
                  <img src={img} alt=''/>
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
          <h2>Related Blends</h2>
          {blendBoxes}
          <a className='button' href='#' onClick={()=>{addFreeSamplesToCart()}}>Get Free Samples</a>
          <hr style={{width: '50px',margin:'10px auto'}}/>
        </div>
      );
    }
  }

  return (
    <div>
      <NavBar/>
      <div className='blend-data'>
        <div className='blend-data-wrapper y-split-parent'> 
          <div className='blend-imgs y-split half'>
            <div className='blend-imgs-wrapper'>
              <div className='img-holder blend-imgs-main-display-holder'>
                <img src={activeBlendImg} alt=''/>
              </div>
              <ul className='blend-imgs-list'>
                <BlendPictures/>
              </ul> 
            </div>
          </div>
          <div className='blend-text y-split half'>
            <div className='blend-text-wrapper'>
              <h2>{blend.name} Blend</h2>
              <p className='blend-description light'>{blend.description}</p>
              <div className='blend-data-inputs y-split-parent'>
                <div className='blend-data-input-qty y-split third'>
                  <h5>Weight:</h5>
                  <select onChange={(e)=>{changeWeight(e)}} value={weight}>
                  <DisplayBlendRates/>
                  </select>
                </div>
                <div className='blend-data-input-wght y-split third'>
                  <h5>Quantity:</h5>
                  <div className='inputs-line y-split-parent mobile-y-split-parent'>
                    <div className='y-split mobile-y-split third blend-qty-incrementer'>
                      <span className='' onClick={()=>{incrementQuantity(-1)}}><span>-</span></span>
                    </div>
                    <div className='y-split mobile-y-split third'>
                      <span className='blend-qty-holder'>{quantity}</span>
                    </div>
                    <div className='y-split mobile-y-split third blend-qty-incrementer'>
                      <span className='' onClick={()=>{incrementQuantity(1)}}><span>+</span></span>
                    </div>
                  </div>
                </div>
                <div className='y-split third'>
                  <h5>Price:</h5>
                  <span className='cost-holder'>${cost}</span>
                </div>
              </div>
              <button className='full' onClick={()=>{addToCart(12)}}>Add to Cart</button>
            </div>            
          </div>
        </div>
      </div>
      <div className='related-blends dark'>
        <RelatedBlendsComponent/>
      </div>
      <NewsletterSignUp/>
      <Map/>
      <Footer/>
    </div>
  );
}


