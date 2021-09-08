import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Navigation } from "..";

interface gearProps{
    name?: string,
    distance?: any
}

const useStyles = makeStyles(() =>
    createStyles({
        root:{
            display:'flex'
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
            backgroundColor: "#32a852",
            borderRadius: "0.5em",
        },

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

    // var shoe1 = shoes[0];
    // var shoe1Distance = shoes[0].distance;
    // console.log(shoe1Distance)
    const shoeLocker = 
            <div><h2>Shoes:</h2>
            {shoes.map((shoe, index) => (
            <>
            <h2>{shoe.name}</h2>
            <h3>Distance traveled: {shoe.distance} miles</h3>
            <div className={classes.progressBar}>
                <div className={classes.innerBar} style={{width: `calc((${shoe.distance}/400)*100%)`}}></div>
            </div>
            </>
            ))} 
            </div>; 

    const bikeLocker = 
        <div><h2>Bikes:</h2>
            {bikes.map((bike, index) => (
            <h2>{bike.name}</h2>))}   
        </div>;

    return(
        <>
        <Navigation />
            {shoeLocker}
            {bikeLocker}
        </>
    )
}