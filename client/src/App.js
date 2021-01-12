import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './common/Home'
import Nav from './common/Nav'

import PokeLogin from './auth/PokeLogin'
import PokeRegister from './auth/PokeRegister'

import PokeBasket from './PokeComponents/PokeBasket'
import PokeComment from './PokeComponents/PokeComment'
import PokePayment from './PokeComponents/PokePayment'
import PokePurchased from './PokeComponents/PokePurchased'
import PokeShow from './PokeComponents/PokeShow'
import PokeIndex from './PokeComponents/PokeIndex'
import PokeProfile from './PokeComponents/PokeProfile'
import PokeConfirmation from './PokeComponents/PokeConfirmation'




function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokelogin" component={PokeLogin} />
        <Route exact path="/pokeregister" component={PokeRegister} />
        <Route exact path="/pokeprofile" component={PokeProfile} />
        <Route path="/pokeindex/:category/:searchCriteria" component={PokeIndex} />
        <Route exact path="/pokebasket" component={PokeBasket} />
        <Route exact path="/pokecomment/:id" component={PokeComment} />
        <Route exact path="/pokepayment" component={PokePayment} />
        <Route exact path="/pokepurchased" component={PokePurchased} />
        <Route path="/pokeshow/:id" component={PokeShow} />
        <Route path="/pokeconfirmation" component={PokeConfirmation} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
















