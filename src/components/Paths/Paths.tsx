import React, { useState, useEffect } from "react";
import { Popup, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';
import axios from "axios";
import '../../index.css';


export const Paths = () =>{
    interface Route {
        activityCoords: any,
        activityName: string,
        
    }
    
    require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;
    const refreshToken=process.env.REACT_APP_REFRESH_TOKEN;

    // const [activities, setActivities] = useState();
    const [routes, setRoutes] = useState<Route[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const stravaAuthResponse = await axios.all([
                axios.post(`https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`)
                ]);

            const stravaActivityResponse = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${stravaAuthResponse[0].data.access_token}`);
            console.log(stravaActivityResponse.data[0].name)
            console.log(stravaActivityResponse.data);
            
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
        
        }
    
        fetchData();
    }, []);
    
    
    return(
        <>
        {routes.map((route, i) => (
        <Polyline key = {i} positions={route.activityCoords}>
            <Popup>
                <div>
                    <h2>{"Name: " + route.activityName}</h2>
                </div>
            </Popup>
        </Polyline>
        ))}
        </>
        
    )
}