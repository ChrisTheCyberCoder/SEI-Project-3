import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ImageUploadField from './ImageUploadField'

function PokeRegister() {
  //*error message to be cleared on focus.

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
    image: 'https://res.cloudinary.com/dcwxp0m8g/image/upload/v1610368867/pokezon/default_user_image.png',
    address: '',
    dob: ''
  })
  //* add default image

  const handleChange = (event) => {
    if (event.target.name === 'dob') event.target.style.color = 'black'
    // console.log(event.target.name)
    // console.log(event.target.value)
    setFormdata({ ...formdata, [event.target.name]: event.target.value })
  }

  // console.log(formdata)

  const handleSubmit = async event => {
    event.preventDefault()

    // if (formdata.image === '') {
    //   setFormdata({ ...formdata, image: 'https://res.cloudinary.com/dcwxp0m8g/image/upload/v1610368867/pokezon/default_user_image.png' })
    //   handleSubmit()
    // }

    
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
      const num = ['0','1','2','3','4','5','6','7','8','9']
      if (num.indexOf(item) !== -1)
        return true
    })

    console.log(check)

    if (!check) {
      setPasswordHasNoSpecialCharacter(true)
      return //note to self: keeep this return here so that it does not execute the catch block below
    }

    const checkCapitals = passwordToCheck.find(item => {
      const capitals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      if (capitals.indexOf(item) !== -1)
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
      if (err.response.data.errors.username) {
        setUsernameNotUnique(true)
        'error name'
      }
      if (err.response.data.errors.passwordConfirmation === 'does not match') setPasswordNotMatch(true)
      if (err.response.data.errors.email) setEmailNotUnique(true)
        
    }
  }

  

  function registerUser(formdata) {
    return axios.post('/api/register', formdata)
  }
  
  function handleFocus(e){
    switch (e.target.name) {
      case 'username': setUsernameNotUnique(false)
        break
      case 'email': 
        setEmailNotUnique(false)  
        setEmailInIncorrectFormat(false)
        break
      case 'password': 
        setPasswordHasNoSpecialCharacter(false)
        setPasswordNotMatch(false)
        break  
      case 'passwordConfirmation': setPasswordNotMatch(false)
        break
      default:
        console.log('null')
    }
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
            onFocus={handleFocus}
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
            onFocus={handleFocus}
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
            onFocus={handleFocus}
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
            onFocus={handleFocus}
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
