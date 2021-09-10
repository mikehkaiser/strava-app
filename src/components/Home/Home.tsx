import React from "react";
import '../../index.css';
import { Navigation } from "..";
import { makeStyles, createStyles } from "@material-ui/styles";
import {handleLogin} from '../Navigation'
import background from '../../assets/images/DJI_0231.jpg';
import connectButton from '../../assets/strava-brand-assets/btn_strava_connectwith_orange.png'

const useStyles = makeStyles(() =>
    createStyles({
    root:{
            padding: '0',
            margin: '0'
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
        main_text:{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '5px',
            position: 'relative',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'black',
            fontFamily: "'Josefin Sans', sans-serif",
            width: 'fit-content',
            padding: '3vw'
        },
        main_scrim:{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundSize: 'cover',
            width: '100%',
            height: '100%',
        },
        contactLink:{
            textDecoration: 'none'
        },
        connectButton:{
            width: 'fit-content',
            padding: '0',
            borderWidth: "0px",
            backgroundColor: "none",
        },
        bottom: {
            position: 'absolute',
            bottom: '0',
            right: '0',
            marginRight: '1vw'
        }
    }));

export const Home = () =>{
    const classes = useStyles()
    
    return(
        <>
        <div className={classes.root}>
            <main className={classes.main}>
                <div className={classes.main_scrim}>
                    <Navigation />
                    <div className={classes.main_text}>
                        <div><h3>ROUTE MAPPER</h3></div>
                        <button className={classes.connectButton} onClick={handleLogin}>
                            <img src={connectButton} alt="connect-with-strava-button" />
                        </button>
                    </div>
                    <div className={classes.bottom}><p>All images &copy; Jordan Vonderhaar</p></div>
                </div>
                
            </main>
            
        </div>
        </>
    )
};