import './App.css';
import React from 'react';
import { MapItem } from './components/mapItem/mapItem.jsx';
import mapa from './backend/mapa.js';
// import numericMap from './backend/numericMap';

function App() {
  return (
    <div className='container'>
      <div className="map-title">Mapa de Ícones</div>
      <div className="map-container">
        {mapa.map((linha, indexLinha) => {
          return (
            <div className="linha" key={indexLinha}>
              {linha.map((celula, indexColuna) => {
                return (
                  <MapItem 
                    item={celula}
                    itemPosition={[indexLinha, indexColuna]} 
                    key={indexColuna} 
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      {/* <div className="map-container">
        <div className="map-title">Mapa Numérico</div>
        {mapa.map((linha, indexLinha) => {
          return (
            <div className="linha" key={indexLinha}>
              {linha.map((celula, indexColuna) => {
                let numericClassName = `mapItem mapItem--numeric`;
                if (celula === 0) {
                  numericClassName += ` mapItem--water`;
                } else if (celula === 1) {
                  numericClassName += ` mapItem--land`;
                } else if (celula === 2) {
                  numericClassName += ` mapItem--treasure`;
                } else if (celula === 3) {
                  numericClassName += ` mapItem--pirate`;
                }

                return (
                  <div className={numericClassName} key={indexColuna}>
                    {celula}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

export default App;