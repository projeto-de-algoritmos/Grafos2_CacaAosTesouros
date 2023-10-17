import React, { useState, useEffect } from 'react';
import MapItem from "../mapItem/mapItem"
import { useDispatch, useSelector } from 'react-redux';
import mapaDoTesouro from '../../backend/mapa';
import "./map.css"

export function Map(props) {
  const dispatch = useDispatch();
  const shortestPath = useSelector((state) => state.game.shortestPath);
  const [map, setMap] = useState(mapaDoTesouro.mapa);
  const [displayedPath, setDisplayedPath] = useState([]);

  return (
    <>
      <div className="map-title">Mapa do Tesouro</div>
      <div className="map-subtitle">clique em qualquer tesouro para receber as coordenadas</div>
      <div className="map-container">
        {map.map((linha, indexLinha) => {
          return (
            <div className="map-line" key={indexLinha}>
              {linha.map((celula, indexColuna) => {
                const currentPosition = [indexLinha, indexColuna];
                const isPartOfPath = displayedPath.some(pos => pos === `${indexLinha},${indexColuna}`);
                return (
                  <MapItem
                    item={celula}
                    itemPosition={currentPosition}
                    key={`${indexLinha}-${indexColuna}`}
                    isPartOfPath={isPartOfPath}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}