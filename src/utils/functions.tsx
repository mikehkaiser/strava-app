import axios from "axios";

require('dotenv').config();
    const clientID=process.env.REACT_APP_CLIENT_ID;
    const clientSecret=process.env.REACT_APP_CLIENT_SECRET;

// export const getParamValues = (url:any) => {
//     return url
//         .slice(1)
//         .split("&")
//         .reduce((prev:any, curr:any) => {
//             const [title, value] = curr.split("=");
//             prev[title] = value;
//             return prev;
//         }, {});
// };

export const cleanUpAuthToken = (str:any) => {
    const check = str.split("&")[1].slice(5);
    console.log(check);
    return str.split("&")[1].slice(5);
};

export const testAuthGetter = async (authTok:any) => {
    try {
        const response = await axios.post(
            `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${authTok}&grant_type=authorization_code`
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};