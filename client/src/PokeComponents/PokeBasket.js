/* eslint-disable no-unused-vars */

import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
import { isAuthenticated } from '../lib/auth'


/* need styling on this page */

function PokeBasket() {

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {

    if (!isAuthenticated) return 

    const getData = async () => {
      try { 
        const { data } = await axios.get('api//userprofile', headers())
        console.log(data)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()

  }, [])

  //! Debug console.log('work with this', iterateResponse)
  
 


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

  // function getUserId(){
  //   const payload = getPayload()
  //   if (!payload) return false
  //   console.log( 'userId on pokeshow',payload.sub )
  //   return payload.sub
  // }  


  // function checkStatus() {
  //   if (unauthorised) {
  //     return  (
  //       <h1>Access Denied: Please Login</h1> /* need styling here */
  //     )
  //   } else if (!iterateResponse) {
  //     return (
  //       <h1>...Loading</h1>  /* need styling here */
  //     )
  //   } 
  // }
  
  
  return (



    


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

        <p>...loading</p>
    
      }
    </div>
    
  ) 
}

export default PokeBasket 