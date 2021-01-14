
import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
import { getPayload } from '../lib/auth'

/* need styling on this page */

function PokeBasket() {

  const [iterateResponse, setIterateResponse] = React.useState(null)
  const [unauthorised, setUnauthorised] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data: { basket1 } } = await axios.get('api/userprofile', headers())
  
        const requestsArray = basket1.map(item => {
          return item.itemId
        })
        
        const requestsArrayForResponse = requestsArray.map(itemToAxios => {
          console.log('item to axios', itemToAxios)
          return axios.get(`api/items/${itemToAxios}`)
        })

        const response = await Promise.all(requestsArrayForResponse) //const response
        const iterateResponse = response.map(item => {
          return item.data
        })

        console.log('the result of iterateresponse', iterateResponse)
        setIterateResponse(iterateResponse)

      } catch (err) {
        // console.log(err.response.data.message)
        if (err.response.data.message === 'Unauthorized') {
          setUnauthorised(true)
          console.log('hello')
        }
      }
    }
    getData()

  }, [])

  //! Debug console.log('work with this', iterateResponse)
  
 


  const handleBasketItemDelete = async event => {
    console.log(event.target.dataset.item)
    const itemToDelete = event.target.dataset.item
    const userId = `${getUserId()}`

    try {
      const deleteResponse = await axios.delete(`api/userprofile/${userId}/${itemToDelete}`)
      console.log('delete response worked', deleteResponse)
      window.location.reload()
    } catch (err) {
      console.log('delete response failed', err)
    }

  }

  function getUserId(){
    const payload = getPayload()
    if (!payload) return false
    console.log( 'userId on pokeshow',payload.sub )
    return payload.sub
  }  


  function checkStatus() {
    if (unauthorised) {
      return  (
        <h1>Access Denied: Please Login</h1> /* need styling here */
      )
    } else if (!iterateResponse) {
      return (
        <h1>...Loading</h1>  /* need styling here */
      )
    } 
  }
  
  
  return (

    <div>
      {iterateResponse ? iterateResponse.map(item =>
        <div key={item._id}>
          <div>Name: {item.name}</div>
          <div>Stock:{item.stock}</div>
          <div>Description: {item.description}</div>
          <div>Price:{item.price}</div>
          <img src={item.image}></img>
          <button data-item={item._id} onClick={handleBasketItemDelete}>Delete</button>
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