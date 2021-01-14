import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
// import { getSingleItem } from '../lib/api'
import { getPayload } from '../lib/auth'

function PokeBasket() {

  // const [userProfileData, setUserProfileData] = React.useState(null)
  // const [ item, setItem] = React.useState(null)

  
  
  const [itemsToRequestFromAxios, setItemsToRequestFromAxios] = React.useState(null)
  const [requestsArrayForResponse, setRequestsArrayForResponse] = React.useState(null)
  const [iterateResponse, setIterateResponse] = React.useState(null)
  

  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data: { basket1 } } = await axios.get('api/userprofile', headers())
        console.log('this is basket1', basket1)
        // data.basket.push('5')
        // setUserProfileData(data)
        const requestsArray = basket1.map(item => {
          return item.itemId
        })
        setItemsToRequestFromAxios(requestsArray)

        const requestsArrayForResponse = requestsArray.map(itemToAxios => {
          console.log('item to axios', itemToAxios)
          return axios.get(`api/items/${itemToAxios}`)
        })

        //worked from here

        const response = await Promise.all(requestsArrayForResponse) //const response

        console.log('amazing work', response)

        const iterateResponse = response.map(item => {
          return item.data
        })

        console.log('the result of iterateresponse', iterateResponse)

        const addQuantityToEach = iterateResponse.map(iitem => {
          const getItFromBasket = basket1.map(item => {
            const array = [item.quantity]
            return array
          })

          return  iitem.quantiy = getItFromBasket //getItFromBasket
        })

        console.log('the result of iterateresponse NEW NEW NEW', iterateResponse)

        console.log('QUANTITY', addQuantityToEach)

        setIterateResponse(iterateResponse)

        setRequestsArrayForResponse(requestsArrayForResponse)

        // console.log('da request array', itemsToRequestFromAxios) //note to self: it wont work here as get data not called

        //console.log('the requests array', requestsArray)


      } catch (err) {
        console.log(err)
      }
    }
    getData()

  }, [])

  console.log('da request array', itemsToRequestFromAxios) // note to self: put here instead

  //console.log('check this', itemsToRequestFromAxios[0])

  console.log('did it work?', requestsArrayForResponse) // did it work

  
  //! Debug

  console.log('work with this', iterateResponse)
  
  /*
  get single item
  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await getSingleItem(`${itemsToRequestFromAxios[0]}`) //(`${itemsToRequestFromAxios[0]}`) //'5ffee9985d401a09d5f512a3'
        //console.log(data)

        setItem(data)
        

      } catch (err) {
        console.log('it failed', err)
      }
    }
    getData()
  },[itemsToRequestFromAxios]) // [itemsToRequestFromAxios]

  console.log('it worked', item) // needs to be here because getdata needs to be called , so put here rather than in try block 

  */


  const handleBasketItemDelete = async event => {
    console.log('I have been clicked')
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

    

    // when delete button is clicked 
    // I need the backend to delete the item
    //perhaps find by id and delete. 

    // remove from front end and then update in backend. 

  }

  function getUserId(){
    const payload = getPayload()
    if (!payload) return false
    console.log( 'userId on pokeshow',payload.sub )
    return payload.sub
  }  
  
  

  
  return (
    
    <div>
      {!iterateResponse ? '...Loading' : iterateResponse.map(item =>
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
      )}
    </div>
    
  ) 
}

export default PokeBasket 