import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './common/Home.js'
import Nav from './common/Nav.js'

import PokeLogin from './auth/PokeLogin.js'
import PokeRegister from './auth/PokeRegister.js'

import PokeBasket from './PokeComponents/PokeBasket.js'
import PokeComment from './PokeComponents/PokeComment.js'
import PokePayment from './PokeComponents/PokePayment.js'
import PokePurchased from './PokeComponents/PokePurchased.js'
import PokeShow from './PokeComponents/PokeShow.js'


function App() {

  return (

    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokelogin" component={PokeLogin} />
        <Route exact path="/pokeregister" component={PokeRegister} />
        <Route exact path="/pokebasket" component={PokeBasket} />
        <Route exact path="/pokecomment" component={PokeComment} />
        <Route exact path="/pokepayment" component={PokePayment} />
        <Route exact path="/pokepurchased" component={PokePurchased} />
        <Route exact path="/pokeshow" component={PokeShow} />
      </Switch>
    </BrowserRouter>

  )






}

export default App
















// import React from 'react'

// class App extends React.Component {
//   async componentDidMount() {
//     try {
//       const response = await fetch('/api/resource-name')
//       const data = await response.json()
//       console.log(data)
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   render() {
//     return null
//   }
// }

// export default App
