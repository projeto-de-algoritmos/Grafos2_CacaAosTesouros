import './App.css';
import React, { useEffect } from 'react';
import mapaDoTesouro from './backend/mapa.js';
import { Map } from './components/map/map';
import { useDispatch, useSelector } from 'react-redux';
import { setPiratePosition } from './store/gameSlice';
// import numericMap from './backend/numericMap';

function App() {
  const dispatch = useDispatch();

  const isTreasureSelected = useSelector((state) => state.game.isTreasureSelected);

  useEffect(() => {
    // Coloca a posicao do pirata no redux quando inicia o frontend
    dispatch(setPiratePosition(mapaDoTesouro.posPirata));
  }, []);
  
  // Faz o djkstra quando o usuário seleciona o tesouro
  useEffect(() => {
    if (isTreasureSelected) {
      alert('Você encontrou o tesouro!');
    }
  }, [isTreasureSelected]);

  return (
    <div className='container'>
      <Map mapa={mapaDoTesouro.mapa} />
    </div>
  )
}

export default App;