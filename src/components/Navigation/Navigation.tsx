import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';



// const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const redirectUrl = "http://localhost/";
// const scope = "profile:read_all";

// const handleLogin = async () => {
//     const result = await fetch("http://www.strava.com/oauth/authorize?client_id=69886&response_type=code&redirect_uri=http://localhost:3000/&approval_prompt=auto&scope=profile:read_all");
//     const data = await result.json();
//     console.log(data)
// };



export const Navigation =()=>{
    return(
    <>
        <Navbar collapseOnSelect expand="md" variant="light">
            <Container className="me-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="">Navbar</Navbar.Brand>
                        <Nav variant="tabs" className="mx-auto" defaultActiveKey="/home">
                            <Nav.Link className="mx-5" href="/home">Home</Nav.Link>
                            <Nav.Link className="mx-5" href="/activities">Activities</Nav.Link>
                            <Button>Connect with Strava</Button>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}