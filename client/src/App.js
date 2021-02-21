import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './common/Home'
import Nav from './common/Nav'

import PokeLogin from './auth/PokeLogin'
import PokeRegister from './auth/PokeRegister'

import PokeBasket from './components/PokeBasket'
import PokeComment from './components/PokeComment'
import PokePayment from './components/PokePayment'
import PokePurchased from './components/PokePurchased'
import PokeShow from './components/PokeShow'
import PokeIndex from './components/PokeIndex'
import PokeProfile from './components/PokeProfile'
import PokeConfirmation from './components/PokeConfirmation'
import PokeCheckout from './components/PokeCheckout'
import PokeThankyou from './components/PokeThankyou'




function App() {

  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokelogin" component={PokeLogin} />
        <Route exact path="/pokeregister" component={PokeRegister} />
        <Route exact path="/pokeprofile" component={PokeProfile} />
        <Route exact path="/pokethankyou" component={PokeThankyou} />
        <Route path="/pokeindex/:category/:searchCriteria/:page" component={PokeIndex} />
        <Route exact path="/pokebasket" component={PokeBasket} />
        <Route exact path="/pokecomment/:id" component={PokeComment} />
        <Route exact path="/pokepayment" component={PokePayment} />
        <Route exact path="/pokepurchased" component={PokePurchased} />
        <Route path="/pokeshow/:id" component={PokeShow} />
        <Route path="/pokeconfirmation" component={PokeConfirmation} />
        <Route path="/pokecheckout" component={PokeCheckout} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
















