import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ImageUploadField from './ImageUploadField'

function PokeRegister() {

  const [passwordNotMatch, setPasswordNotMatch] = React.useState(false)
  const [usernameNotUnique, setUsernameNotUnique] = React.useState(false)
  const [emailNotUnique, setEmailNotUnique] = React.useState(false)
  const [passwordHasNoSpecialCharacter, setPasswordHasNoSpecialCharacter] = React.useState(false)
  const [emailInIncorrectFormat, setEmailInIncorrectFormat] = React.useState(false)

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
    // console.log(event.target.name)
    // console.log(event.target.value)
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  // console.log(formdata)

  const handleSubmit = async event => {
    event.preventDefault()

    if (formdata.email.slice(-4) !== '.com' && formdata.email.slice(-6) !== '.co.uk' && formdata.email.slice(-6) !== '.co.jp') { //if neither in field throw error execute code. If one in field code can't execute. 
      console.log('no .com or co.uk')
      setEmailInIncorrectFormat(true)
      return 
    }

    // if (formdata.email.slice(-6) !== '.co.uk') {
    //   console.log('no .co.uk')
    //   return
    // }

    // console.log(formdata.email.slice(-4))

    const passwordToCheck = formdata.password.split('')
    // console.log(passwordToCheck)
    // console.log(typeof passwordToCheck)

    // if (!passwordToCheck.includes('1', '2', '3', '4', '5', '6', '7', '8', '9')) {
    //   console.log('pw no number')
    //   setPasswordHasNoSpecialCharacter(true)
    //   return
    // }

    const check = passwordToCheck.find(item => {
      if (item === '1' || item === '2' || item === '3' || item === '4' || item === '5' || item === '6' || item === '7' || item === '8' || item === '9' )
        return true
    })

    console.log(check)

    if (!check) {
      setPasswordHasNoSpecialCharacter(true)
      return //note to self: keeep this return here so that it does not execute the catch block below
    }

    const checkCapitals = passwordToCheck.find(item => {
      if (item === 'A' || item === 'B' || item === 'C' || item === 'D' || item === 'E' || item === 'F' || item === 'G' || item === 'H' || item === 'I' || item === 'J' || item === 'K' || item === 'L' || item === 'M' || item === 'N' || item === 'O' || item === 'P' || item === 'Q' || item === 'R' || item === 'S' || item === 'T' || item === 'U' || item === 'V' || item === 'W' || item === 'X' || item === 'Y' || item === 'Z' )
        return true
    })

    if (!checkCapitals) {
      setPasswordHasNoSpecialCharacter(true)
      return //note to self: keeep this return here so that it does not execute the catch block below
    }

    try {
      const response = await registerUser(formdata)
      // console.log('check out', response.errors.passwordConfirmation)
      console.log(response)
      history.push('/pokelogin') 
    } catch (err) {

      //console.log(err.response)
      // console.log('catche error', err.response.data) 
      // console.log('check if correct', err.response.data.errors.passwordConfirmation)
      if (err.response.data.errors.passwordConfirmation === 'does not match') setPasswordNotMatch(true)
      if (err.response.data.errors.username) setUsernameNotUnique(true)
      if (err.response.data.errors.email) setEmailNotUnique(true)
        
    }
  }

  

  function registerUser(formdata) {
    return axios.post('/api/register', formdata)
  }


  return (
    <section className="page_wrapper">
      <form onSubmit={handleSubmit} className="float_up">
        <div className="input_box">
          <label>Username</label>
          <input 
            placeholder="Pikachu"
            name="username"
            onChange={handleChange}
            value={formdata.username}
          />
          { usernameNotUnique ? <p>Username Not Unique</p> : null }
        </div>
        <div className="input_box">
          <label>Email</label>
          <input 
            placeholder="pikachu@ichooseyou.com"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
          { emailNotUnique ? <p>Email Not Unique</p> : null }
          { emailInIncorrectFormat ? <p>Email must be in name@email.com or name@email.co.uk</p> : null }
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
          { passwordNotMatch ? <p>Passwords Do Not Match</p> : null}
          { passwordHasNoSpecialCharacter ? <p>Password must contain atleast one number and one capital Letter</p> : null}
        </div>
        <div className="input_box">
          <label>Profile Image</label>
    
          <ImageUploadField
            value={formdata.image}
            name="image"
            onChange={handleChange}
          />
          {/* <input
            value={formdata.image}
            name="image"
            onChange={handleChange}
          /> */}
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
