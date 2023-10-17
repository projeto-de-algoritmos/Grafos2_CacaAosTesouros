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

  const animatePath = (shortestPath) => {
    let currentStep = 0;
    const updatedMap = map.map(row => [...row]);
  
    const interval = setInterval(() => {
      if (currentStep < shortestPath.length) {
        const [x, y] = shortestPath[currentStep].split(',').map(Number);
        updatedMap[x][y] = 4; // Atualiza para indicar o caminho percorrido
        setMap(updatedMap);
        currentStep++;
      } else {
        clearInterval(interval);
        // Limpa o caminho e redefine o estado após a conclusão da animação
        setDisplayedPath([]);
        dispatch(setShortestPath(null)); // Atualiza o estado com null para limpar o caminho mais curto
      }
    }, 500); // Intervalo de tempo ajustável para controlar a velocidade da animação
  
    // Define o caminho a ser exibido durante a animação
    setDisplayedPath(shortestPath.map(step => step));
  };
  
  useEffect(() => {
    if (shortestPath && shortestPath.length > 0) {
      animatePath(shortestPath);
    }
  }, [shortestPath]);

  return (
    <>
      <div className="map-title">Mapa do Tesouro</div>
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










