import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Container, Row, Col, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';
import { Navigation } from "..";
import { makeStyles, createStyles } from "@material-ui/styles";
import background from '../../assets/images/DSC02284.jpg';


//create the main class for displaying the activities

interface activityProps{
    actId?: any,
    name?: any,
    type?: any
    distance?: any,
    date?: string,
    coords?: any,
    pace?: any
};

interface routeProps{
    routeId?:any,
    name?: string,
    coords?: any,
    pace: any,
    distance:any
};

const useStyles = makeStyles(() =>
    createStyles({
        root:{
            padding: '0',
            margin: '0'
        },
        main: {
            background: `url(${background})`,
            backgroundAttachment: 'fixed',
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        main_scrim:{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
        },
        map_holder:{
            position: 'fixed'
        },
        activity_map:{
            position: 'absolute',
        },
        act_accordion:{
            marginTop: '0.2vw'
        }

}));

export const Activities = () =>{
    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;
    const classes = useStyles();

    const [actList, setactList] = useState<activityProps[]>([]);
    const [routes, setRoutes] = useState<routeProps[]>([]);
    

    useEffect(() => {
        const fetchActivities = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            
            
            const stravaActivityResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAuthResponse[0].data.access_token}`);
            console.log(stravaActivityResponse.data)
            var activityList = [];
            for(let i=0;i<10;i++){
                var actId = stravaActivityResponse.data[i].id;
                var actName = stravaActivityResponse.data[i].name;
                var actType = stravaActivityResponse.data[i].type;
                var actPace = (26.8224/(stravaActivityResponse.data[i].average_speed)).toFixed(2)
                var actDistance = ((stravaActivityResponse.data[i].distance)/1609.344).toFixed(1);
                var actCoords = polyline.decode(stravaActivityResponse.data[i].map.summary_polyline.replace(/^"|"$/g, ''));
                var startDate = (stravaActivityResponse.data[i].start_date).slice(0,10);
                var year = startDate.slice(0,4);
                var month = startDate.slice(5,7);
                var day = startDate.slice(8,10);
                var strMonth = "0"
                if (month === "01"){
                    strMonth = "Jan"
                } else if (month === "02"){
                    strMonth = "Feb"
                } else if (month === "03"){
                    strMonth = "Mar"
                } else if (month === "04"){
                    strMonth = "April"
                } else if (month === "05"){
                    strMonth = "May"
                } else if (month === "06"){
                    strMonth = "June"
                } else if (month === "07"){
                    strMonth = "July"
                } else if (month === "08"){
                    strMonth = "Aug"
                } else if (month === "09"){
                    strMonth = "Sep"
                } else if (month === "10"){
                    strMonth = "Oct"
                } else if (month === "11"){
                    strMonth = "Nov"
                } else if (month === "12"){
                    strMonth = "Dec"
                };
                var actDate = `${strMonth} ${day}, ${year}`;
                // here coordinates get pushed to activityList
                activityList.push({actId: actId, name: actName, type: actType, pace: actPace, distance: actDistance, date: actDate, coords: actCoords});
                
            }
            
            setactList(activityList);
            
        }; 
        fetchActivities();
    }, []);


    const activityAccordion = 
        actList.map((activity, index) => (
            <Accordion className={classes.act_accordion} key={activity.actId}>
                <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>
                    {activity.date} | {activity.name}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h2>{activity.name}</h2>
                        <p>Distance: {activity.distance} miles</p>
                        <p>Activity Type: {activity.type}</p>
                        <Button className="mx-2" variant="warning" onClick={function(){
                                setRoutes(routes => [...routes, {routeId: activity.actId, distance: activity.distance, name: activity.name, pace: activity.pace, coords: activity.coords}]);
                            }}>Add to map</Button>
                        <Button className="mx-2" variant="warning" onClick={function(){
                            const newRoutes = routes.filter(routes => routes.routeId !== activity.actId)
                            setRoutes(newRoutes);
                            }}
                            >Remove from map</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>   
    ));

    const activityRoutes = 
        routes.map((route) => ( //positions is based on route.coords state variable:prop
            <Polyline key={route.routeId} positions={route.coords} pathOptions={{color: '#f78f07', opacity: 0.4}}>
                <Popup>
                    <div>
                        <h5>{route.name}</h5>
                        <h5>{route.distance} miles at {route.pace} min/mile</h5>
                    </div>
                </Popup>
            </Polyline>
    ));

    const handleClearMap=()=>{
        setRoutes([])
    };

    return(
        <div className={classes.root}>
            <main className={classes.main}>
                <div className={classes.main_scrim}>
            <Navigation />
            <Container>
                <Row>
                    <Col className="my-3" md={5} sm={12}>
                        {activityAccordion}
                    </Col>
                    <Col className="MapContainer my-4" md={5} sm={12}>
                        <div className={classes.map_holder}>
                            <main className={classes.activity_map}>
                            <MapContainer center={[42.04, -87.9244]} zoom={12} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            />
                                    {activityRoutes}
                            </MapContainer>
                            <Button className="my-1" variant="warning" onClick={handleClearMap}>Clear Activities</Button>
                            </main>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </main>
        </div>
    )

};

console.log(window.location.href)
let url = window.location.href

export const cleanUpAuthToken = (str:any) => {
    const check = str.split("&")[1].slice(5);
    console.log(check);
    return check;
};

cleanUpAuthToken(url)