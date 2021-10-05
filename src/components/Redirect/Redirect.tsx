import React, { useEffect } from "react";
import _ from "lodash";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { cleanUpAuthToken, getParamValues, testAuthGetter } from '../../utils/functions';

interface SignInProps{
    history: RouteComponentProps["history"];
    location: RouteComponentProps['location'];
};

export const Redirect = withRouter((props:SignInProps) =>{
    const { history, location } = props
    
    useEffect(() => {
    const authenticate = async () =>{
        try{
            if (_.isEmpty(location)){
                return history.push("/");
            }
            const stravaAuthToken = cleanUpAuthToken(window.location.href);
            console.log(window.location.href);
            const tokens = await testAuthGetter(stravaAuthToken)
            console.log(tokens)
            history.push("/activities")
            }
            catch (error) {
                history.push("/");
            }
        }
        authenticate();
    
    });
    
    return(
        null
    )
});