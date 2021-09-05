import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';
import axios from "axios";
import '../../index.css';
import { Paths } from "..";

export const ActivityMap = () =>{
    
    return(
        <>
        <h1>Testing</h1>
        <MapContainer center={[42.048, -87.88]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>
        {/* Goal will be to pass these in via store as an onclick event */}
        <Paths />

        </MapContainer>
        </>
    )
}