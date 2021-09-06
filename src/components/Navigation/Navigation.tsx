import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export const Navigation =()=>{
    return(
    <>
        <Navbar collapseOnSelect expand="md" variant="light">
            <Container className="me-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="">Navbar</Navbar.Brand>
                        <Nav variant="tabs" className="mx-auto" defaultActiveKey="/activities">
                            <Nav.Link className="mx-5" href="/home">Home</Nav.Link>
                            <Nav.Link className="mx-5" href="/activities">Activities</Nav.Link>
                            <Button variant="warning">Connect with Strava</Button>
                        </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}