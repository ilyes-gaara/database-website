import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import HomePage from "./HomePage"
import Courses from './Courses'

function App() {
  return (
    <Container>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              
                    <Route path="/courses" component={Courses} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
        
            </Switch>
          </AuthProvider>
        </Router>
        
    </Container>
  )
}

export default App
