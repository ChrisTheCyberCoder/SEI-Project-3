import React from 'react'
import axios from 'axios' 
import { headers } from '../lib/api' 
// import { getSingleItem } from '../lib/api'

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
        console.log(basket1)
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



  
  

  
  return (

   

    <div>
      {!iterateResponse ? '...Loading' : iterateResponse.map(item =>
        <div key={item._id}>
          <div>Name: {item.name}</div>
          <div>Stock:{item.stock}</div>
          <div>Description: {item.description}</div>
          <div>Price:{item.price}</div>
          <img src={item.image}></img>
          <br />
          <br />
        </div>
      )}
    </div>

    
  // <div>
  //   {userProfileData ?
  //     <div>
  //       <h1>Basket{userProfileData.username}</h1>
  //       <h1>{userProfileData.email}</h1>
  //       <h1>{userProfileData.basket}</h1>
  //       <h1>{userProfileData.dob}</h1>
  //       <h1>{userProfileData.address}</h1>
  //       <h1>{userProfileData.image}</h1>
  //       <h1>{userProfileData.basket1[0].item}</h1>
  //     </div>
  //     :
  //     <p>...Loading</p>}
  // </div>


    
  ) 
}

export default PokeBasket 