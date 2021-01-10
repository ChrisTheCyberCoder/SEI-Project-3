import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export function getToken() {
  return window.logcalStorage.getItem('token')
}

function PokeLogin() {

  const history = useHistory()

  const [formdata, setFormdata] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => { 
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/')
    } catch (err) {
      console.log(err)
    }

    console.log('submitting', formdata)
  }

  function loginUser(formdata) {
    return axios.post('/api/login', formdata)
  }

  function setToken(token) {
    window.localStorage.setItem('token', token)
  }
  

  return (
    <section className="page_wrapper">
      <form onSubmit={handleSubmit} className="float_up">
        <div className="input_box">
          <label>Email</label>
          <input 
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formdata.email}
          />
        </div>
        <div className="input_box">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={formdata.password}
          />
        </div>
        <div className="button_wrapper">
          <button type="submit">
            <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
            Log Me In!
          </button>
        </div>
      </form>
    </section>
  )
}

export default PokeLogin