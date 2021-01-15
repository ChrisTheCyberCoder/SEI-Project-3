/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
import { isAuthenticated } from '../lib/auth'
import { Link } from 'react-router-dom'

import pokeDollar from '../assets/poke_dollar.svg'
import upArrow from '../assets/arrow_up.svg'
import MarchampSecurity from '../PokeComponents/MarchampSecurity'
import PikachuLoadingScreen from '../PokeComponents/PikachuLoadingScreen'
import ditto from '../assets/ditto.svg'

/* need styling on this page */
function PokeBasket() {
  const [user, setUser] = React.useState(null)
  const [unauthorized, setUnauthorized] = React.useState(false)


  React.useEffect(() => {
    if (!isAuthenticated) return 
    const getData = async () => {
      try { 
        const { data } = await axios.get('/api/userprofile', headers())
        console.log(data)
        setUser(data)
      } catch (err) {
        console.log(err.response.status)
        if (err.response.status === 401) {
          setUnauthorized(true)
          return
        } 
      }
    }
    getData()
  }, [])

  const handleBasketItemDelete = async e => {
    console.log(e.target.dataset.item)
    const itemToDelete = e.target.dataset.item
    try {
      await axios.delete(`/api/userprofile/basket/${itemToDelete}`, headers())
      const { data } = await axios.get('/api/userprofile', headers())
      console.log(data)
      
      if (data) e.target.parentNode.parentNode.parentNode.classList.add('slide_away')
      setTimeout(()=>{
        setUser(data)
      },700)

    } catch (err) {
      console.log('delete response failed', err)
    }
  } 


  function checkStatus() { 
    if (unauthorized) {
      return  (
        <section className="page_wrapper">
          <MarchampSecurity
            message='Access Denied: Please Login to View the Basket'
            link='/pokelogin'
            buttonText='Login'
          />
        </section>
      )
    } else if (user && user.basket.length === 0){
      return (
        <div className="message default_box_style float_up">
          <h2>Basket is empty!</h2>
          <img className="ditto" src={ditto} alt="ditto" />
          <div className="button_wrapper"> 
            <Link to={'/'}>
              <button>
                <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
                  Home
              </button> 
            </Link>
          </div>  
            
        </div>
      )
    } else {  
      return (
        <PikachuLoadingScreen/>
      )
    } 
  }

  const totalPrice = arr =>{
    let total = 0
    arr.forEach(product=>{
      total += product.quantity * product.item.price
    })
    return total
  }


  return (  
    <div className="page_wrapper_column">
      {user && user.basket.length !== 0 ? 
        <div className="basket_wrapper default_box_style">
          <div className="total_price">
            <span>total:</span><img src={pokeDollar} alt="pokedollar sign" />{totalPrice(user.basket)}
          </div>
          
          <div className="button_wrapper flexend less_margin">
            <button>
              <img src="../assets/pokeball_orange.svg" alt="pokeball" />
              Check Out
            </button>
          </div>
          
        </div>
        :
        null
      }
      {user && user.basket.length !== 0 ? 
        user.basket.map(product =>
          <div className="basket_wrapper default_box_style" key={product._id}>
            <div className="image_wrapper">
              <Link to={`/pokeshow/${product.item._id}`}>
                <img className="pulse" src={product.item.image} alt={product.item.name}/>
              </Link>  
            </div>
            <div className="info">
              <label>
                {product.item.name}
                <img src={pokeDollar} alt="pokedollar sign" />
                {product.item.price}
              </label>
              <div className={`stock ${product.item.stock <= 2 && 'red_text'}`}>
                {product.item.stock <= 2 && 'only '}
                {product.item.stock} left in stock
              </div>
              {/* <div className="description">
                {product.item.description}
              </div> */}

              <div className="button_wrapper flexend">
                <button data-item={product._id} onClick={handleBasketItemDelete}>
                  <img src="../assets/pokeball_orange.svg" alt="pokeball" />
                  Remove from basket
                </button>
              </div>
            </div>
          </div>
        ) 
        :
        checkStatus()
      }
      {user && user.basket.length !== 0 ? 
        
        <div className={`basket_wrapper default_box_style ${user.basket.length < 5 && 'hidden'}`}>

          <div className="total_price">
            <span>total:</span><img src={pokeDollar} alt="pokedollar sign" />{totalPrice(user.basket)}
          </div>
          
          <div className="button_wrapper flexend less_margin">
            <button>
              <img src="../assets/pokeball_orange.svg" alt="pokeball" />
              Check Out
            </button>
            <button className="up" onClick={()=>{
              window.scrollTo(0, 0)
            }}>
              <img src={upArrow} alt="up arrow" />
              Scroll To Top
            </button>
          </div>
          
        </div>
        :
        null
      }
    </div>
  ) 
}
export default PokeBasket 