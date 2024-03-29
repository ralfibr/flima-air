//Project Internet of things Flima Air 
//@author Raeef Ibrahim
//App
import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import LiveWeather from "./LiveWeather"

//Defone React Navigation
function App() {

  return (
      <div >
    
       <Router>
      <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/LiveWeather" component={LiveWeather} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </AuthProvider>
        </Router>
        </div>
  
  

  )
}

export default App
