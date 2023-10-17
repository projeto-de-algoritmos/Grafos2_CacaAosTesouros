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
  const shortestPath = useSelector((state) => state.game.shortestPath);
  const map = mapaDoTesouro.mapa;

  useEffect(() => {
    dispatch(setPiratePosition(mapaDoTesouro.posPirata));
  }, [dispatch]);

  useEffect(() => {
    if (isTreasureSelected) {
      const shortestPathsObject = pathFinder(map, piratePosition);
      const shortestPathsArray = Object.entries(shortestPathsObject).map(([key, value]) => {
        return `${key}: ${value.steps}`;
      });
      dispatch(setShortestPath(shortestPathsArray));
      setCoordinates(shortestPathsArray);
      setShowModal(true);
    }
  }, [isTreasureSelected, piratePosition, map, dispatch]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const explainCoordinates = (coordinate) => {
    const parts = coordinate.split(':');
    const treasureCoordinates = parts[0].trim();
    const steps = parts[1].trim();
    return `O menor caminho para o tesouro em ${treasureCoordinates} é ${steps} quadradinhos.`;
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