import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ImageUploadField from './ImageUploadField'

function PokeRegister() {

  const history = useHistory() 
  const [formdata, setFormdata] = React.useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: '',
    address: '',
    dob: ''
  })

  const handleChange = (event) => {
    console.log(event.target.name)
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  console.log(formdata)

  const handleSubmit = async event => {
    event.preventDefault()
    

    try {
      await registerUser(formdata)
      history.push('/pokelogin') 
    } catch (err) {
      console.log(err.response.data) 
    }
  }

  function registerUser(formdata) {
    return axios.post('/api/register', formdata)
  }

  //   <input 
  //   placeholder="Image"
  //   name="image"
  //   onChange={handleChange}
  //   value={formdata.image}
  // />

  return (
    <section className="page_wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={formdata.username}
          />
        </div>
        <div>
          <label>Email</label>
          <input 
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formdata.password}
          />
        </div>
        <div>
          <label>Password Confirmation</label>
          <input 
            type="password" 
            placeholder="Password"
            name="passwordConfirmation"
            onChange={handleChange}
            value={formdata.passwordConfirmation}
          />
        </div>
        <div>
          <label>Image</label>
    
          <ImageUploadField
            value={formdata.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input 
            placeholder="Address"
            name="address"
            onChange={handleChange}
            value={formdata.address}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input 
            placeholder="Date of Birth"
            name="dob"
            onChange={handleChange}
            value={formdata.dob}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  )
}

export default PokeRegister
