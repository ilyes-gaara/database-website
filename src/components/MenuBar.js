import React, { useState, useEffect } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory} from 'react-router-dom'

function MenuBar() {

    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("")
    const history = useHistory()

    //Handle Logout
    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    //Conditioning SIGN IN and LOGOUT in Navbar
    const signInNav = currentUser ?  
        <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
    :
        <Nav.Link as={Link} to="/login">Log In</Nav.Link>;
    //Conditioning Dashboard in Menu
    const dashboardMenu = currentUser ? 
    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
      :
    null;

    return (
        <div>
        <Navbar expand="lg">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                    {dashboardMenu}
                    {signInNav}
                </Nav>
            </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default MenuBar
