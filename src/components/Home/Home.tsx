import React, {useState} from "react";
import '../../index.css';
import { Navigation } from "..";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {handleLogin} from '../Navigation'
import background from '../../assets/images/DJI_0231.jpg';
import connectButton from '../../assets/strava-brand-assets/btn_strava_connectwith_orange.png'

const useStyles = makeStyles((theme: Theme) =>
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
        main_text:{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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

    export interface State extends SnackbarOrigin {
        open: boolean;
    }

export const Home = () =>{
    const classes = useStyles();
    
    const [state, setState] = React.useState<State>({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    function Alert(props: AlertProps) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        setState({ ...state, open: false });
    };


    return(
        <>
        <div className={classes.root}>
            <main className={classes.main}>
                <div className={classes.main_scrim}>
                    <Navigation />
                    <Snackbar anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal} open={open} autoHideDuration={10000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info">
                        "Connect with Strava" is under construction. <br/>
                        For now, some detault activities and gear are available through the Navigation Links.
                        </Alert>
                    </Snackbar>
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