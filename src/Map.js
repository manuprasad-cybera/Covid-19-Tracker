import React from 'react';
import './Map.css'
import { MapContainer, TileLayer  } from "react-leaflet";
import { showDataOnMap } from './util';

function Map({ countries, center, casesType, zoom }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy;<a href="http://osm.org/copyrigh">openstreetmap</a> contributers'
                />
                {
                    showDataOnMap(countries, casesType)
                }
            </MapContainer>
        </div>
    )
}

export default Map
