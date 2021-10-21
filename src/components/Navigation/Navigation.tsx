import React, { useEffect } from "react";
import '../../index.css'
import Navbar from 'react-bootstrap/Navbar';
import Col from "react-bootstrap/Col";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import stravaBrand from '../../assets/strava-brand-assets/api_logo_pwrdBy_strava_horiz_light.png';
import rmIcon from '../../assets/icon/routemapper.png'


require('dotenv').config();
const clientID=process.env.REACT_APP_CLIENT_ID;
const redirectUrl = "http://localhost:3000/activities";

export const handleLogin = () => {
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=auto&scope=profile:read_all,activity:read_all`;

};

export const Navigation =()=>{
    return(
    <>
        <Navbar collapseOnSelect style={{fontFamily:"'Josefin Sans', sans-serif"}}expand="md" bg="dark" variant="dark">
            <Container className="me-auto">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col md={{ span: 3 }}>
                            <Navbar.Brand href="/">
                                <img
                                src={rmIcon}
                                width="auto"
                                height="60vw"
                                className="d-inline-block align-top"
                                alt="powered by strava logo"
                                />
                            </Navbar.Brand>
                        </Col>
                        <Col md={{ span: 6 }}>
                        <Nav className="mx-auto justify-content-around">
                            <Nav.Link href="/"><h5>Home</h5></Nav.Link>
                            <Nav.Link href="/activities"><h5>Activities</h5></Nav.Link>
                            <Nav.Link href="/gear"><h5>Gear</h5></Nav.Link>
                        </Nav>
                        </Col>
                        <Col md={{ span: 2, offset: 1 }} className="justify-content-end">
                        <Navbar.Brand href="https://www.strava.com">
                            <img
                            src={stravaBrand}
                            width="auto"
                            height="40vw"
                            className="d-inline-block align-top"
                            alt="powered by strava logo"
                            />
                        </Navbar.Brand>
                        </Col>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}