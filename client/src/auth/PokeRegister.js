import React from 'react'

function PokeRegister() {


  return (
    <section>
      <form>
        <div>
          <label>Username</label>
          <input placeholder="Username"></input>
        </div>
        <div>
          <label>Email</label>
          <input placeholder="Email"></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password"></input>
        </div>
        <div>
          <button type="submit">Log Me In!</button>
        </div>
      </form>
    </section>
  )
}

export default PokeRegister
