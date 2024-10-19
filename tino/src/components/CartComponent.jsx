import { useState, useEffect } from 'react';
import * as React from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom';
import tinoStore from './../components/reducers/tinoStore';

import NavStyles from './../styles/NavStyles.css';
import CartStyles from './../styles/CartStyles.css';

import CartBlendOne from './../images/blends/cart/1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CartComponent(){

  const [cartItems, setCartItems] = useState(tinoStore.getState().items);

  const navigate = useNavigate();

  // redirect if the cart is empty
  const redirectIfCartEmpty = () => {
    if(cartItems.length == 0){
      navigate('/home');
    }
  }
  redirectIfCartEmpty();

  const [taxDecimal, setTaxDecimal] = useState('.07');
  const [taxTotal, setTaxTotal] = useState(0);
  const [shipping, setShipping] = useState(10);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const calculateTotals = () => {
    let newSubtotal = 0;
    cartItems.map((item, index)=>{
      newSubtotal += (item.count * item.price);
    })
    setTaxTotal((newSubtotal*taxDecimal).toFixed(2));
    let newTotal = newSubtotal+(newSubtotal*taxDecimal)+shipping;
    setTotal(newTotal);
    setSubtotal(newSubtotal);
  }
  useEffect(() => {
    calculateTotals();
  },[total, subtotal, shipping, taxDecimal, cartItems]);

  const incrementItemQuantity = (itemId, incNumber) => {
    let relItem = cartItems.find(item => item.id == itemId);
    if(relItem.count + incNumber >= 0){
      tinoStore.dispatch({
        type: 'CHANGE_QUANTITY',
        quan: quantity,
        itemId: itemId,
        newCount: relItem.count + incNumber
      })
      setCartItems(tinoStore.getState().items);
    }
  }

  const deleteItem = (itemId) => {
    tinoStore.dispatch({
      type: 'DELETE_ITEM',
      itemId: itemId
    })
    setCartItems(tinoStore.getState().items);
  }

  return(
    <div className='cart-display y-split-parent'>
      <div className='y-split half cart-items-section'>
        <h2>Cart:</h2>
        <ul className='cart-items'>
          {
            cartItems.map((item, index)=>{
              return (<li key={index} className='y-split-parent mobile-y-split-parent'>
                <div className='y-split mobile-y-split quarter blend-cart-img'><Link to={{pathname: "/blend", search:"?blend="+item.name }}><img src={CartBlendOne} className='blend-cart-img'/></Link></div>
                <div className='y-split mobile-y-split fifth cart-item-name'><h4><Link to={{pathname: "/blend", search:"?blend="+item.name }}>{item.name}</Link></h4></div>
                <div className='y-split mobile-y-split sixth cart-item-unit'><h6>Unit:<br/><span className='light-text'>{item.weight}</span></h6></div>
                <div className='y-split mobile-y-split quarter cart-item-quantity'>
                  <h6>Quantity:<br/></h6>
                  <div className='inputs-line y-split-parent mobile-y-split-parent'>
                    <div className='y-split mobile-y-split fifth blend-qty-incrementer'>
                      <span className='' onClick={()=>{incrementItemQuantity(item.id,-1)}}><span>-</span></span>
                    </div>
                    <div className='y-split mobile-y-split third'>
                      <span className='blend-qty-holder cart-blend-qty-holder'>{item.count}</span>
                    </div>
                    <div className='y-split mobile-y-split fifth blend-qty-incrementer'>
                      <span className='' onClick={()=>{incrementItemQuantity(item.id,1)}}><span>+</span></span>
                    </div>
                  </div>
                </div>
                <div className='y-split mobile-y-split tenth dark item-total'><h6>${item.count * item.price}</h6></div>
                <div className='y-split mobile-y-split eighth delete-item'><button onClick={()=>{deleteItem(item.id)}}>-</button></div>
              </li>)
            })
          }
        </ul> 
      </div>
            <div className='y-split half dark checkout-form'>
        <h2>Checkout:</h2>
        <form className='y-split-parent'>
          <div className='y-split-parent'>
            <div className='y-split half'>
            <label>
              <h5 className='light-text'>First Name:</h5>
              <input name='first_name'/>
            </label>
            </div>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>Last Name:</h5>
                <input name='last_name'/>
              </label>
            </div>
          </div>
          <div className='y-split-parent'>
            <div className='y-split half'>
            <label>
              <h5 className='light-text'>Email Address:</h5>
              <input name='email_address'/>
            </label>
            </div>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>Street Address:</h5>
                <input name='street_address'/>
              </label>
            </div>
          </div>
          <div className='y-split-parent'>
            <div className='y-split half'>
            <label>
              <h5 className='light-text'>Unit:</h5>
              <input name='unit'/>
            </label>
            </div>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>City:</h5>
                <input name='city'/>
              </label>
            </div>
          </div>
          <div className='y-split-parent'>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>State:</h5>
                <input name='state'/>
              </label>
            </div>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>Zipcode:</h5>
                <input name='zipcode'/>
              </label>
            </div>
          </div>
          <div className='y-split-parent'>
            <div className='y-split half'>
              <label>
                <h5 className='light-text'>Country:</h5>
                <input name='country'/>
              </label>
            </div>
            <div className='y-split half'>
            </div>
          </div>
        </form>
        <div className='checkout-box dark'>
          <h2>Total:</h2>
          <ul className='cart-totals y-split-parent mobile-y-split-parent'>
            <li className='y-split mobile-y-split quarter'>
              <h6>Tax: <br/><span className='light-text cart-total'>${taxTotal} ({(taxDecimal*100).toFixed()}%)</span></h6>
            </li>
            <li className='y-split mobile-y-split quarter'>
              <h6>Shipping: <br/><span className='light-text cart-total'>${shipping}</span></h6>
            </li>
            <li className='y-split mobile-y-split quarter'>
              <h6>Subtotal: <br/><span className='light-text cart-total'>${subtotal.toFixed(2)}</span></h6>
            </li>
            <li className='y-split mobile-y-split quarter'>
              <h6>Total: <br/><span className='light-text cart-total'>${total.toFixed(2)}</span></h6>
            </li>
          </ul>
          <button className='full'>Checkout</button>
        </div>
      </div>
    </div>
  );
}