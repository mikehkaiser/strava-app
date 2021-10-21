import React, { useState, useEffect } from "react";
import '../../index.css';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import { Navigation } from "..";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import background from '../../assets/images/DSC02284.jpg';

interface gearProps{
    name?: string,
    distance?: number
}

const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            width: '100%',
            '& > * + *': {
            marginTop: theme.spacing(2),
            },
            },
        main: {
            background: `url(${background})`,
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            position: 'absolute',
        },
        progressBar:{
            width: "500px",
            height:"1.5em",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#b8b7b4",
            borderRadius: "1em",
            position: "relative",
        },

        innerBar:{
            display: "flex",
            content:'" "',
            alignItems:"center",
            position: "absolute",
            left: "0.3em",
            top:"0.3em",
            bottom: "0.3em",
            width: "var(width)",
            minWidth: "2em",
            maxWidth: "calc(100%-1em)",
            backgroundColor: "var(backgroundColor)",
            borderRadius: "0.5em",
        },

        changeMessage:{
            display:'none'
        },
        main_scrim:{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
        },
        mainContent:{
            display: 'flex',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '5px',
            marginTop: '1vw',
            fontFamily: "'Josefin Sans', sans-serif"
        }

}));


export const Gear = () =>{
    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;
    const classes=useStyles();

    const [bikes, setBikes] = useState<gearProps[]>([]);
    const [shoes, setShoes] = useState<gearProps[]>([]);

    useEffect(() => {
        const fetchGear = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            const stravaGearResponse = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${stravaAuthResponse[0].data.access_token}`);
            var shoeList = [];
            var bikeList = [];

            for(let i=0;i<stravaGearResponse.data.shoes.length;i++){
                var shoeName = stravaGearResponse.data.shoes[i].name;
                var shoeDistance = stravaGearResponse.data.shoes[i].converted_distance;
                console.log(shoeName + ": " + shoeDistance + " miles")
                shoeList.push({name: shoeName, distance: shoeDistance})
            }

            for(let i=0;i<stravaGearResponse.data.bikes.length;i++){
                var bikeName = stravaGearResponse.data.bikes[i].name;;
                var bikeDistance = stravaGearResponse.data.bikes[i].converted_distance;
                console.log(bikeName + ": " + bikeDistance + " miles")
                bikeList.push({name: bikeName, distance: bikeDistance})
            }
            setBikes(bikeList)
            setShoes(shoeList)
        }; 
        fetchGear();
    }, []);

    const [display, setDisplay] = useState(false)
    console.log(shoes)
    
    function AlertDismissible() {
        const [show, setShow] = useState(true);

        return (
            <>
            <Alert className="my-3" show={show} variant="success" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Looks like you've put in some miles!
                {/* <Button className="d-inline my-auto ms-5" onClick={() => setShow(false)} variant="outline-secondary">
                    Hide me
                </Button> */}
                </Alert.Heading>
                <p>
                    These shoes are getting close to retirement. Might be time to check out your favorite running store for some new kicks.
                </p>
                    
            </Alert>
            {!show && <Button className="my-3" variant="success" onClick={() => setShow(true)}>Tired yet?</Button>}
            </>
        );
    }
    
    const shoeLocker = 
            <div>
                <h2>Shoes:</h2>
            {shoes.map((shoe, index) => (
            <>
            <hr />
            <h3>{shoe.name}</h3>
            <h4>Distance traveled: {shoe.distance} miles</h4>
            
            <div>
                <div className={classes.progressBar}>
                    <div className={classes.innerBar} style={{width: `calc((${shoe.distance}/400)*100%)`, backgroundColor: +`${shoe.distance}`>250? "#eb4034" : +`${shoe.distance}`>200 ? '#ebb22d' : '#1fad70'}}></div>
                </div>
            </div>
            <div className={classes.changeMessage} style={+`${shoe.distance}` > 250 ? {display:'inline'} : {display:'none'} }>
                <AlertDismissible />
            </div>
            
            </>
            ))} 
            <hr />
            </div>; 

    const bikeLocker = 
        <div>
            <h2>Bikes:</h2>
            {bikes.map((bike, index) => (
            <>
            <h3>{bike.name}</h3>
            <h4>Distance traveled: {bike.distance} miles</h4>
            </>
            ))}   
        </div>;

    return(
        <>
        <div className={classes.root}>
            <main className={classes.main}>
                <div className={classes.main_scrim}>
                <Navigation />
                <Container>
                    <Row>
                        <div className={classes.mainContent}>
                        <Col className="px-3 md-6 my-2">
                        <div>{shoeLocker}</div>
                        </Col>
                        <Col className="px-3 md-6 my-2">
                        <div>{bikeLocker}</div>
                        </Col>
                        </div>
                    </Row>
                </Container>
                </div>
            </main>
        </div>
        </>
    )
}