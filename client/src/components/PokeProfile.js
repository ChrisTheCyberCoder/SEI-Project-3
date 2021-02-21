import React from 'react'
import axios from 'axios'
import { headers } from '../lib/api'

function PokeProfile() {

  const [userProfileData, setUserProfileData] = React.useState(null)

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


  return (

    <div>
      {userProfileData ?
        <div>
          <h1>{userProfileData.username}</h1>
          <h1>{userProfileData.email}</h1>
          <h1>{userProfileData.basket}</h1>
          <h1>{userProfileData.dob}</h1>
          <h1>{userProfileData.address}</h1>
          <h1>{userProfileData.image}</h1>
        </div>
        :
        <p>...Loading</p>}
    </div>
  

  )
  
  
}

export default PokeProfile