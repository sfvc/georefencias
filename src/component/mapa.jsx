import React, { useState, useEffect, useRef } from 'react';
import { MapaBackground } from './mapa/mapaBackground';
import MapaFooter from './mapa/mapaFooter';
import botones from '../data/botones.json';
import Header from './header';

export const Mapa = ({ proyecto }) => {
    const [showModal, setShowModal] = useState(false);
    const [mapPoints, setMapPoints] = useState([]);
    const [centerPoint, setCenterPoint] = useState(null);
    const mapRef = useRef(null); // <--- Ref to the map

    useEffect(() => {
        const primerosPuntos = botones[0]?.puntos || [];
        if (primerosPuntos.length > 0) {
            setMapPoints(primerosPuntos);
            setCenterPoint(primerosPuntos[0].coords);
            setShowModal(true);
        }
    }, []);

    const closeAllPopups = () => {
        if (mapRef.current) {
            mapRef.current.closePopup();
        }
    };

    return (
        <div>
            <Header/>
            <MapaBackground
            mapRef={mapRef}
            mapPoints={mapPoints}
            centerPoint={centerPoint}
            closeAllPopups={closeAllPopups}
            />
            <MapaFooter
                setShowModal={setShowModal}
                mapPoints={mapPoints}
                setMapPoints={setMapPoints}
                setCenterPoint={setCenterPoint}
                closeAllPopups={closeAllPopups} // <--- Pasamos función
            />
        </div>
    );
};
