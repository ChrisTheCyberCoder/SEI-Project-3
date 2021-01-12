import React from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

// export function getToken() {
//   return window.localStorage.getItem('token')
// }

function PokeLogin() {

  const history = useHistory()

  const [formdata, setFormdata] = React.useState({
    email: '',
    password: ''
  })

  const [error, setError] = React.useState('')
  const [numberOfAttempts, setNumberOfAttempts] = React.useState(2)
  const [ranOutOfAttempts, setRanOutOfAttempts] = React.useState(false)
  const [loadfailure, setLoadFailure] = React.useState(false)

  const handleChange = event => {
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => { 
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)

      if (data.message === 'Unauthorized') {
        console.log(data.message)
        setError(`The Information you provided is incorrect. You have ${numberOfAttempts} attempt(s) remaining`) 
        if (numberOfAttempts === 0 ) setRanOutOfAttempts(true)
        setNumberOfAttempts(numberOfAttempts - 1)
        return 
      }

      setToken(data.token)
      history.push('/')
      window.location.reload()

    } catch (err) {
      console.log(err)
      console.log('Sorry failure to load the login page')
      setLoadFailure(true)
    }

    console.log('submitting', formdata)
  }

  function loginUser(formdata) {
    return axios.post('/api/login', formdata)
  }

  function setToken(token) {
    window.localStorage.setItem('token', token)
  }

  function loadFailure() {
    if (loadfailure) {
      return (
        <>
          <h1>We do apologise, the server is down</h1>
          <Link to={'/'}>
            <button>Home</button> {/*I would need this section to be styled*/}
          </Link>
        </>
      )
    } else {
      return (
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
            <p>{error}</p>
          </div>
          <div className="button_wrapper">
            <button type="submit">
              <img src="../assets/pokeball_orange.svg" alt="pokeball" /> 
              Log Me In!
            </button>
          </div>
        </form>
      )
    }
  }
  

  return (
    <section className="page_wrapper">
      { ranOutOfAttempts ? 
        <div >
          <h1>As a Security Precaution, you will no longer be able to access this account for awhile</h1> 
          <Link to={'/'}>
            <button>Home</button> {/*I would need this section to be styled*/}
          </Link>
        </div>
        : 
        <>
          {loadFailure()}
        </>}
    </section>
  )
}

export default PokeLogin