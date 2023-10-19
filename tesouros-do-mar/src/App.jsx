import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import mapaDoTesouro from './backend/mapa.js';
import { dijkstra } from './backend/dijkstra';

import { setShortestPath } from './store/gameSlice';
import { Map } from './components/map/map';

function App() {
  const dispatch = useDispatch();

  const isTreasureSelected = useSelector((state) => state.game.isTreasureSelected);
  const treasurePosition = useSelector((state) => state.game.treasurePosition);

  const {mapa, posPirata } = mapaDoTesouro;

  useEffect(() => {
    if(isTreasureSelected){
      const shortestPath = dijkstra(mapa, posPirata, treasurePosition);
      console.log(mapa);
      dispatch(setShortestPath(shortestPath));
    }
  }, [isTreasureSelected]);


  return (
    <div className='container'>
      <Map mapa={mapa} />
    </div>
  );
}

export default App;