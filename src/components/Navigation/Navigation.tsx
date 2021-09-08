import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

require('dotenv').config();
const clientID=process.env.REACT_APP_CLIENT_ID;
const redirectUrl = "http://localhost:3000/redirect";

const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=profile:read_all,activity:read_all`;
};

export const Navigation =()=>{
    return(
    <>
        <Navbar collapseOnSelect expand="md" variant="light">
            <Container className="me-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="">Navbar</Navbar.Brand>
                        <Nav variant="tabs" className="mx-auto">
                            <Nav.Link className="mx-5" href="/">Home</Nav.Link>
                            <Nav.Link className="mx-5" href="/activities">Activities</Nav.Link>
                            <Nav.Link className="mx-5" href="/gear">Gear</Nav.Link>
                            <Button variant="warning" onClick={handleLogin}>Connect with Strava</Button>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}