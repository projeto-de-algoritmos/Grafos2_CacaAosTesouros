import './App.css';
import React, { useState, useEffect } from 'react';
import mapaDoTesouro from './backend/mapa.js';
import { Map } from './components/map/map';
import { useDispatch, useSelector } from 'react-redux';
import { setPiratePosition } from './store/gameSlice';
import pathFinder from './backend/dijkstra';
import { setShortestPath } from './store/gameSlice';

function App() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  const isTreasureSelected = useSelector((state) => state.game.isTreasureSelected);
  const treasurePosition = useSelector((state) => state.game.treasurePosition);
  const piratePosition = useSelector((state) => state.game.piratePosition);
  const map = mapaDoTesouro.mapa;

  useEffect(() => {
    dispatch(setPiratePosition(mapaDoTesouro.posPirata));
  }, [dispatch]);

  useEffect(() => {
    if (isTreasureSelected) {
      const shortestPathsObject = pathFinder(map, piratePosition, treasurePosition);
      const shortestPathsArray = Object.entries(shortestPathsObject).map(([key, value]) => {
        const formattedKey = key.replace(',', ', ');
        return `${formattedKey}: ${value}`;
      });
      dispatch(setShortestPath(shortestPathsArray));
      setCoordinates(shortestPathsArray);
      setShowModal(true);
    }
  }, [isTreasureSelected, treasurePosition, piratePosition, map, dispatch]);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const explainCoordinates = (coordinate) => {
    const parts = coordinate.split(':');
    const treasureCoordinates = parts[0].trim();
    const pathCoordinates = parts[1].trim();
    return `O menor caminho para o tesouro em ${treasureCoordinates} é ${pathCoordinates}`;
  };

  return (
    <div className='container'>
      <Map mapa={map} />
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Coordenadas do caminho mais curto:</h2>
            {coordinates.map((coordinate, index) => (
              <p key={index}>{explainCoordinates(coordinate)}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;