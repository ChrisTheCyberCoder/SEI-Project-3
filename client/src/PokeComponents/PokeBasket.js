/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
import { isAuthenticated } from '../lib/auth'
import { Link } from 'react-router-dom'
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
      const { data } = await axios.get('api//userprofile', headers())
      console.log(data)
      setUser(data)
    } catch (err) {
      console.log('delete response failed', err)
    }
  } 
  function checkStatus() { /* need styling here */
    if (unauthorized) {
      return  (
        <>
          <h1>Access Denied: Please Login to View the Basket</h1> 
          <Link to={'/pokelogin'}>
            <button>Login</button>
          </Link>
        </>
      )
    } else {
      return (
        <h1>...Loading</h1>  /* need styling here Or Spinner */
      )
    } 
  }
  return (   /* need styling here */
    <div>
      {user ? user.basket.map(product =>
        <div key={product._id}>
          <div>Name: {product.item.name}</div>
          <div>Stock:{product.item.stock}</div>
          <div>Description: {product.item.description}</div>
          <div>Price:{product.item.price}</div>
          <img src={product.item.image}></img>
          <button data-item={product._id} onClick={handleBasketItemDelete}>Delete</button>
          <br />
          <br />
        </div>
      ) 
        :
        checkStatus()
      }
    </div>
  ) 
}
export default PokeBasket 