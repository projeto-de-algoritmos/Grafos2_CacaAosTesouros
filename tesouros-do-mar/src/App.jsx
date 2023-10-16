import './App.css';
import React, { useEffect } from 'react';
import mapaDoTesouro from './backend/mapa.js';
import { Map } from './components/map/map';
import { useDispatch, useSelector } from 'react-redux';
import { setPiratePosition } from './store/gameSlice';
import pathFinder from './backend/dijkstra';

function App() {
  const dispatch = useDispatch();

  const isTreasureSelected = useSelector((state) => state.game.isTreasureSelected);
  const treasurePosition = useSelector((state) => state.game.treasurePosition);
  const piratePosition = useSelector((state) => state.game.piratePosition);
  const map = mapaDoTesouro.mapa; // Obtendo o mapa do tesouro

  useEffect(() => {
    // Coloca a posição do pirata no redux quando inicia o frontend
    dispatch(setPiratePosition(mapaDoTesouro.posPirata));
  }, []);

  useEffect(() => {
    if (isTreasureSelected) {
      // Chama a função pathFinder com os parâmetros apropriados
      const shortestPath = pathFinder(map, piratePosition, treasurePosition);
      // Atualiza o estado com o caminho mais curto retornado pelo algoritmo Dijkstra
      dispatch(setShortestPath(shortestPath));
    }
  }, [isTreasureSelected, treasurePosition, piratePosition, map, dispatch]);

  return (
    <div className='container'>
      <Map mapa={mapaDoTesouro.mapa} />
    </div>
  )
}

export default App;