import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Container, Row, Col, Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';
import { Navigation } from "..";

//create the main class for displaying the activities

interface activityProps{
    actId?: any,
    name?: any,
    type?: any
    distance?: any,
    date?: string,
    coords?: any
    
};

interface routeProps{
    routeId?:any,
    name?: string,
    coords?: any
};

export const Activities = () =>{
    
    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;

    const [actList, setactList] = useState<activityProps[]>([]);
    const [routes, setRoutes] = useState<routeProps[]>([]);
    // const [data,setData] = useState<any>({});

    useEffect(() => {
        const fetchActivities = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            
            console.log(window.location.href)
            const stravaActivityResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAuthResponse[0].data.access_token}`);
            console.log(stravaActivityResponse.data)
            var activityList = [];
            for(let i=0;i<10;i++){
                var actId = stravaActivityResponse.data[i].id;
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
                activityList.push({actId: actId, name: actName, type: actType, distance: actDistance, date: actDate, coords: actCoords});
                
            }
            
            setactList(activityList);
            
        }; 
        fetchActivities();
    }, []);

    const activityAccordion = 
        actList.map((activity, actId) => (
            <Accordion>
                <Accordion.Item eventKey={actId.toString()}>
                    <Accordion.Header>
                    {activity.date} | {activity.name}
                    </Accordion.Header>
                    <Accordion.Body>
                        <h2>{activity.name}</h2>
                        <p>Distance: {activity.distance} miles</p>
                        <p>Activity Type: {activity.type}</p>
                        <Button onClick={function(){setRoutes(routes => [...routes, {routeId: activity.actId, name: activity.name, coords: activity.coords}])}}>Add to map</Button>
                        <Button onClick={function(){
                            console.log(routes)
                            const toDelete = routes.findIndex(route=>route.routeId === route)
                            console.log(toDelete)
                            
                            
                            }}
        
        
        >Remove from map</Button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>   
    ));

    const activityRoutes = 
        routes.map((route, routeId) => ( //positions is based on route.coords state variable:prop
            <Polyline key={routeId} positions={route.coords} pathOptions={{color: '#f78f07', opacity: 0.4}}>
                <Popup>
                    <div>
                        <h5>{route.name}</h5>
                    </div>
                </Popup>
            </Polyline>
    ));

    const handleClearMap=()=>{
        setRoutes([])
    }

    console.log(routes)
    // const handleRemoveRoute=(route:any)=>{
    //     console.log(routes)
    //     const toDelete = routes.indexOf(route)
    //     console.log(toDelete)
    //     setRoutes(routes.filter(routes[toDelete]))
        
    //     };
    return(
        <div>
            <Navigation />
            <Container>
                <Row>
                    <Col className="listContainer" md={5} sm={12}>
                        {activityAccordion}
                    </Col>
                    <Col className="MapContainer my-auto" md={5} sm={12}>
                    <MapContainer center={[42.04, -87.9244]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    />
                            {activityRoutes}
                    </MapContainer>
                    <Button onClick={handleClearMap}>Clear Activities</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )

};