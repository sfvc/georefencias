import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const SetMapRef = ({ mapRef }) => {
  const map = useMap();
  useEffect(() => {
    if (mapRef) {
      mapRef.current = map;
    }
  }, [map]);
  return null;
};

const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
};

// Close all popups on map click
const ClosePopupOnClick = ({ closeAllPopups }) => {
  useMapEvent('click', () => {
    closeAllPopups();
  });
  return null;
};

export const MapaBackground = ({ centerPoint, mapPoints = [], mapRef, closeAllPopups }) => {
  const defaultPosition = [-28.468240713129212, -65.77863847506036];
  const center = centerPoint || defaultPosition;

  const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <main>
      <MapContainer center={center} zoom={13} style={{ height: '100dvh', width: '100dvw', zIndex: '0' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* ✅ Esto asigna la instancia del mapa a mapRef */}
        <SetMapRef mapRef={mapRef} />

        <MapUpdater center={center} />
        <ClosePopupOnClick closeAllPopups={closeAllPopups} />

        {mapPoints.map((point, index) => (
          <Marker key={index} position={point.coords} icon={markerIcon}>
            <Popup>
              <div className="popup-card">
                {/* <img
                  src="https://cdn.pixabay.com/photo/2024/10/07/10/28/colosseum-9102592_1280.png"
                  alt={point.nombre}
                  className="popup-card__image"
                /> */}
                <div className="popup-card__content">
                  <h3 className="popup-card__title">{point.nombre}</h3>
                  <a
                    href={point.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="popup-card__link"
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </main>
  );
};
