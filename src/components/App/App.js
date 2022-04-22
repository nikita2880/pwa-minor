import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import React from "react";
import {Home} from '../Home'
import { Landing } from "../Landing";
import {Footer} from "../Footer"
import {Navbar} from "../Navbar"
import {Banner} from "../Banner"
import { Product } from "../Product";
import { MyPro } from "../MyProduct";
import PrivateRoute from "../PrivateRoute";
const App = () => {
  
  

  return (
      <Router>
      <Navbar/>
      <Banner/>
       <Switch>
      <Route exact path="/login">
        <Landing/>
      </Route>
      <PrivateRoute exact path="/">
        <Home/>
      </PrivateRoute>
      <PrivateRoute exact path="/mypro">
        <MyPro/>
      </PrivateRoute>
      <Route exact path="/product">
        <Product/>
      </Route>
      </Switch>
      <Footer/>
      </Router>

  );
}

export default App;
