import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import SlowPokeErrorCard from '../components/SlowpokeErrorCard'
import MarchampSecurity from '../components/MarchampSecurity'
import Eevee from '../components/Eevee'




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

  const handleSubmit = async e => { 
    e.preventDefault()
    // console.log('etarget',e.target)

    try {
      const { data } = await loginUser(formdata)

      if (data.message === 'Unauthorized') {

        e.target.classList.remove('float_up')
        e.target.classList.add('shake')
        setTimeout(()=>{
          e.target.classList.remove('shake') 
        },500)

        console.log(data.message)
        setError(`The Information you provided is incorrect. You have ${numberOfAttempts} attempt(s) remaining`) 
        if (numberOfAttempts === 0 ) setRanOutOfAttempts(true)
        setNumberOfAttempts(numberOfAttempts - 1)
        return 
      }


      e.target.classList.remove('float_up')
      e.target.classList.add('accepted')
      setTimeout(()=>{
        setToken(data.token)
        history.push('/')
      },500)

    } catch (err) {
      console.log(err)
      console.log('Sorry failure to load the login page')
      setLoadFailure(true)

      e.target.classList.remove('float_up')
      e.target.classList.add('shake')
      setTimeout(()=>{
        e.target.classList.remove('shake') 
      },500)
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
        <SlowPokeErrorCard
          errorMessage='We do apologise, the server is down.'
        />
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

          <Eevee />
          <div className="button_wrapper flexend">
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
      {ranOutOfAttempts ? 
        <MarchampSecurity 
          message='As a Security Precaution, you are blocked.'
          link='/'
          buttonText='Home'
        />
        : 
        <>
          {loadFailure()}
        </>}
    </section>
  )
}

export default PokeLogin


