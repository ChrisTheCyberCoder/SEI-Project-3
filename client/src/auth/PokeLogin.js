import React from 'react'

function PokeLogin() {

  
  

  return (
    <section>
      <form>
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

export default PokeLogin