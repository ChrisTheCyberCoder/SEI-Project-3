import React from 'react'
import axios from 'axios'
import { headers } from '../lib/api'
// import { getSingleItem } from '../lib/api'

function PokeBasket() {

  const [userProfileData, setUserProfileData] = React.useState(null)
  // const [ item, setItem] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await axios.get('api/userprofile', headers())
        console.log(data)
        data.basket.push('5')
        setUserProfileData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()

  }, [1])

  // //* get single item

  // React.useEffect(() => {
  //   const getData = async () => {
  //     try { 
  //       const { data } = await getSingleItem(id)
  //       setItem(data)
  //       console.log(item) //chris added
  //     } catch (err) {
        
  //       // console.log(err)
  //     }
  //   }
  //   getData()
  // },[id])

  

  
  return (

    <div>
      {!userProfileData ? '...Loading' : userProfileData.basket1.map(item =>
        <div key={item.itemBasketId}>
          <div>{item.item}</div>
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