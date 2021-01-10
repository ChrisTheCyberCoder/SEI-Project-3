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


  return (
    <section className="page_wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input_box">
          <label>Username</label>
          <input 
            placeholder="Pikachu"
            name="username"
            onChange={handleChange}
            value={formdata.username}
          />
        </div>
        <div className="input_box">
          <label>Email</label>
          <input 
            placeholder="pikachu@ichooseyou.com"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
        </div>
        <div className="input_box">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formdata.password}
          />
        </div>
        <div className="input_box">
          <label>Password Confirmation</label>
          <input 
            type="password" 
            placeholder="Password"
            name="passwordConfirmation"
            onChange={handleChange}
            value={formdata.passwordConfirmation}
          />
        </div>
        <div className="input_box">
          <label>Profile Image</label>
    
          <ImageUploadField
            value={formdata.image}
            name="image"
            onChange={handleChange}
          />
        </div>
        <div className="input_box">
          <label>Address</label>
          <input 
            placeholder="eg. 20 Viridian City, Kanto, XXX-XXXX"
            name="address"
            onChange={handleChange}
            value={formdata.address}
          />
        </div>
        <div className="input_box">
          <label>Date of Birth</label>
          <input 
            placeholder="DD / MM / YYYY"
            type = "date"
            name="dob"
            onChange={handleChange}
            value={formdata.dob}
          />
        </div>
        <div className="button_wrapper">
          <button type="submit">
            <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
            Register
          </button>
        </div>
      </form>
    </section>
  )
}

export default PokeRegister
