import React from 'react'
import '../styles/PokeCheckout.scss'
import { useLocation } from 'react-router-dom'



function PokeCheckout() {

  const data  = useLocation()
  const cart = data.state.basket
  
  function OrderTotal() {
    let sum = 0
    cart.map(product => {
      console.log(product.quantity)
      console.log(product.item.price)

      sum += product.quantity * product.item.price
    })
    console.log(sum)
    return sum
  }
  console.log(data)

  return (
    <>
      <div className="full-wrapper">
        <div className="top-part">
          <div>
            Order Confirmation
          </div>
          <div>
            <p>Order Total :</p> <span>{OrderTotal()}</span>
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
                <p className="name">{data.state.username}</p><br/>
                <p>{data.state.email}</p>
              </div>
            </div>
            <div>
              <div>
                <h4>Shipping Address </h4> <a>Edit</a>
              </div>
              <div className="line"></div>
              <div>
                <p className="name">{data.state.username}</p><br/>
                <p>{data.formdata.postcode}</p><br/>
                <p>{data.formdata.country}</p><br/>
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
                <p className="name">{data.formdata.name}</p><br/>
                <p>{data.formdata.postcode}</p><br/>
                <p>{data.formdata.country}</p><br/>
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