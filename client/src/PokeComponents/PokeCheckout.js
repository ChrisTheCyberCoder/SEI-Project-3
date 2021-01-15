import React from 'react'
import '../styles/PokeCheckout.scss'
import { useLocation } from 'react-router-dom'

function PokeCheckout() {

  const { state } = useLocation()

  console.log(state)

  return (
    <>
      <div className="full-wrapper">
        <div className="top-part">
          <div>
            Order Confirmation
          </div>
          <div>
            <p>Order Total :</p> <span>$14500.50</span>
          </div>
          <div>
            <button className="button_wrap" type="button">
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
              <p>Place Order</p>
            </button>
          </div>
        </div>
        <div className="middle-part">
          <div className="middle-part-basic">
            <div>
              <div>
                <h4>Your Information </h4> <a>Edit</a>
              </div>
              <div className="line"></div>
              <div>
                <p className="name">Jack May</p><br/>
                <p>jackmay@email.com</p>
              </div>
            </div>
            <div>
              <div>
                <h4>Shipping Address </h4> <a>Edit</a>
              </div>
              <div className="line"></div>
              <div>
                <p className="name">Jack May</p><br/>
                <p>Apt 16, Pallet Town</p><br/>
                <p>Kanto, MT </p><br/>
                <p>Alpha Continent</p><br/>
                <p>(44) 1234-123456</p>
              </div>
            </div>
          </div>
          <div className="middle-part-basic">
            <div>
              <div>
                <h4>Payment </h4> <a>Edit</a>
              </div>
              <div className="line"></div>
              <div>
                <p>VISA(maybe an image of the logo)</p><br/>
                <p>Visa card ending in 1234</p>
              </div>
            </div>
            <div>
              <div>
                <h4>Billing Address </h4> <a>Edit</a>
              </div>
              <div className="line"></div>
              <div>
                <p className="name">Jack May</p><br/>
                <p>Apt 16, Pallet Town</p><br/>
                <p>Kanto, MT </p><br/>
                <p>Alpha Continent</p><br/>
                <p>(44) 1234-123456</p>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </>
  )
}
export default PokeCheckout