import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function getToken() {
  return window.logcalStorage.getItem('token')
}

function PokeLogin() {

  const history = useHistory()

  const [formdata, setFormdata] = React.useState({
    email: '',
    password: ''
  })

  const [error, setError] = React.useState('')
  const [numberOfAttempts, setNumberOfAttempts] = React.useState(2)
  const [ranOutOfAttempts, setRanOutOfAttempts] = React.useState(false)

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
      // console.log(err)
      console.log('no crap')
      setError(`The Information you provided is incorrect. You have ${numberOfAttempts} attempts remaining`)

      if (numberOfAttempts === 0 ) {
        console.log('it is now 0')
        setRanOutOfAttempts(true)
      }


      setNumberOfAttempts(numberOfAttempts - 1)
      
      
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
    <section>
      { ranOutOfAttempts ? 
        <div>
          <h1>As a Security Precaution, you will no longer be able to access this account for awhile</h1> 
          <Link to={'/'}>
            <button>Home</button> 
          </Link>
        </div>

        : <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input 
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formdata.email}
            />
            <h1>{error}</h1>
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formdata.password}
            />
            <h1>{error}</h1>
          </div>
          <div>
            <button type="submit">Log Me In!</button>
          </div>
        </form>}
    </section>
  )
}

export default PokeLogin