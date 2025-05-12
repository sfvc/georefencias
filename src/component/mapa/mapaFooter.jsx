import React from 'react';
import botones from '../../data/botones.json'; // Asegúrate de que la ruta sea correcta

const MapaFooter = ({ setMapPoints, mapPoints, setShowModal, setCenterPoint, closeAllPopups }) => {
    return (
      <footer className="footer-coyuntura__footer">
        <nav className="footer-coyuntura__footer-nav">
          <div className="footer-coyuntura__footer-links">
            {botones.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  closeAllPopups(); // ⬅️ usar función centralizada
  
                  const nuevosPuntos = item.puntos.filter(
                    (nuevo) =>
                      !mapPoints.some(
                        (existente) =>
                          existente.nombre === nuevo.nombre &&
                          existente.coords[0] === nuevo.coords[0] &&
                          existente.coords[1] === nuevo.coords[1]
                      )
                  );
  
                  if (nuevosPuntos.length > 0) {
                    setMapPoints([...mapPoints, ...nuevosPuntos]);
                    setCenterPoint(nuevosPuntos[0].coords);
                  } else {
                    setCenterPoint(item.puntos[0].coords);
                  }
  
                  setShowModal(true);
                }}
              >
                <img src={item.logo} alt={`${item.id} logo`} width={24} />
              </button>
            ))}
          </div>
        </nav>
      </footer>
    );
  };
  
export default MapaFooter;
