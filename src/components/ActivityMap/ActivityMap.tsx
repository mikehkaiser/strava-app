import React, { useState, useEffect, createRef, Component } from "react";
import { MapContainer, TileLayer, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet'
import polyline from '@mapbox/polyline';
import '../../index.css';
import axios from "axios";

interface routeProps {
    activityCoords?: any,
    activityName?: string,
};

export const ActivityMap = (props: routeProps) =>{
    

    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;

    // const [activities, setActivities] = useState();
    const [routes, setRoutes] = useState<routeProps[]>([]);
    // const [center, setCenter] = useState();

    useEffect(() => {
        const fetchData = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            const stravaActivityResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAuthResponse[0].data.access_token}`);
            console.log(stravaActivityResponse.data[0])

            const actGear = stravaActivityResponse.data[0].gear_id
            const stravaGearResponse = await axios.get(`https://www.strava.com/api/v3/gear/${actGear}?access_token=${stravaAuthResponse[0].data.access_token}`);
            const gearName = `${stravaGearResponse.data.brand_name} ${stravaGearResponse.data.model_name}`
            console.log(gearName)
            
            const polylines = [];
            for(let i=0;i<5;i++){
                const actName = stravaActivityResponse.data[i].name;
                const actCoords = polyline.decode(stravaActivityResponse.data[i].map.summary_polyline.replace(/^"|"$/g, ''));
                polylines.push({activityName: actName, activityCoords: actCoords});
            }
            console.log(polylines)
            console.log(typeof polylines)
            setRoutes(polylines);
        }; 
        fetchData();
    }, []);
    
    
    return(
        <>
        <h1>Testing</h1>
        <MapContainer center={[42.043, -87.928]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
        {/* Goal will be to pass these in via store as an onclick event */}
            {routes.map((route, i) => (
            <Polyline key = {i} positions={route.activityCoords} pathOptions={{color: 'red', opacity: 0.3}}>
                <Popup>
                    <div>
                        <h2>{"Name: " + route.activityName}</h2>
                    </div>
                </Popup>
            </Polyline>
            ))}
        
        {/* <Paths /> */}

        </MapContainer>
        </>
    )
}