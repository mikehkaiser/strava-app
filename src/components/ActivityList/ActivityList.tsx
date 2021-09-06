import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Accordion, Button, Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

//create the main class for displaying the activities

interface activityProps{
    name?: string,
    type?: string,
    distance?: any,
    date?: string
    coords?: any
    
};

interface routeProps{
    name?: string
    coords?: any
};



export const ActivityList = () =>{
    
    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;

    const [actList, setactList] = useState<activityProps[]>([]);
    const [routes, setRoutes] = useState<routeProps[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            const stravaActivityResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAuthResponse[0].data.access_token}`);
            //
            // Will need to put the gear fetch within the loop as well, but for now will leave out so it doesn't do 5 at a time
            //

            // const actGear = stravaActivityResponse.data[0].gear_id
            // const stravaGearResponse = await axios.get(`https://www.strava.com/api/v3/gear/${actGear}?access_token=${stravaAuthResponse[0].data.access_token}`);
            // const gearName = `${stravaGearResponse.data.brand_name} ${stravaGearResponse.data.model_name}`
            // console.log(gearName)
            
            // have activityList here inside useEffect
            var routeList = [];
            var activityList = [];
            for(let i=0;i<10;i++){
                var actName = stravaActivityResponse.data[i].name;
                var actType = stravaActivityResponse.data[i].type;
                var actDistance = ((stravaActivityResponse.data[i].distance)/1609.344).toFixed(1);
                // actCoords is the decoded polyline. This needs to get set dynamically with handlesetRoute event below
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
                activityList.push({name: actName, type: actType, distance: actDistance, date: actDate, coords: actCoords});
                routeList.push({name: actName, coords: actCoords});
            }
            
            setactList(activityList);
            setRoutes(routeList);
        }; 
        fetchData();
    }, []);
    //checking if activityList is available outside useEffect. It is not, because it only exists within useEffect, but I setactList to
    // activityList, so actList == activityList
    // on button click, setRoutes to include actCoords from this activity
    // let handleshowRoutes = () =>{
    //     null
    // };

    // currently clears the routes to an empty list again, and is repopulated upon refresh/rerender
    // will be good if I want to clear the map
    // I need to access the individual routes and be able to add them to routes onClick
    // how to access routes - able to console.log individual routes inline in the return statement
    let handleClearMap = () =>{
        setRoutes([])
    };

    return(
        <div>
            <Container>
                <Row>
                    <Col className="listContainer" md={5} sm={12}>
                    <Button onClick={handleClearMap}>Clear Map</Button>
                        {actList.map((activity, i) => (
                        <Accordion>
                            <Accordion.Item eventKey={{i}.toString()}>
                                <Accordion.Header>
                                {activity.date} | {activity.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <h2>{activity.name}</h2>
                                    <p>Distance: {activity.distance} miles</p>
                                    <p>Activity Type: {activity.type}</p>
                                    {/* Create onClick function to add polyline to map onClick={handlesetRoutes}*/}
                                    <Button onClick={function(){console.log(routes[i].coords)}}>See on Map</Button>
                                    <Button>Remove from Map</Button>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>   
                        ))}         
                    </Col>
                    <Col className="MapContainer" md={6} sm={12}>
                    <MapContainer center={[42.043, -87.928]} zoom={14} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
                    {/* Goal will be to pass these in via store as an onclick event */}
                        {routes.map((route, i) => ( //positions is based on route.coords state variable:prop
                        <Polyline key={i} positions={route.coords} pathOptions={{color: '#f78f07', opacity: 0.4}}>
                            <Popup>
                                <div>
                                    <h5>{route.name}</h5>
                                </div>
                            </Popup>
                        </Polyline>
                        ))}
                    
                    {/* <Paths /> */}

                    </MapContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    )

};