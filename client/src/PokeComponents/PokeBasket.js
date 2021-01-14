/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
import { isAuthenticated } from '../lib/auth'
import { Link } from 'react-router-dom'

import MarchampSecurity from '../PokeComponents/MarchampSecurity'
import PikachuLoadingScreen from '../PokeComponents/PikachuLoadingScreen'

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


  const handleBasketItemDelete = async event => {
    console.log(event.target.dataset.item)
    const itemToDelete = event.target.dataset.item
    try {
      await axios.delete(`/api/userprofile/basket/${itemToDelete}`, headers())
      const { data } = await axios.get('/api/userprofile', headers())
      console.log(data)
      setUser(data)
    } catch (err) {
      console.log('delete response failed', err)
    }
  } 
  function checkStatus() { /* need styling here */
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
    } else {
      return (
        <PikachuLoadingScreen/>
      )
    } 
  }


  return (   /* need styling here */
    <div className="page_wrapper_column">
      {user ? 
        user.basket.map(product =>
          <div className="basket_wrapper default_box_style" key={product._id}>
            <div className="image_wrapper red_border">
              <img src={product.item.image} alt={product.item.name}/>
            </div>
            <div className="description red_border">
              <label>{product.item.name}</label>
              <div>
                {product.item.stock < 2 && 'only '}
                {product.item.stock} left in stock
              </div>
              <div>Description: {product.item.description}</div>
              <div>Price:{product.item.price}</div>
              <button data-item={product._id} onClick={handleBasketItemDelete}>Delete</button>
            </div>
          </div>
        ) 
        :
        checkStatus()
      }
    </div>
  ) 
}
export default PokeBasket 