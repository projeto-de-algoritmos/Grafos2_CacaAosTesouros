import './App.css'
import mapa from './backend/mapa.js'
import {MapItem} from './components/mapItem/mapItem.jsx'

function App() {

  const mapa2D = mapa;

  return (
    <div className='container'>
      {mapa2D.map((linha, indexLinha) => {
        return (
          <div className="linha" key={indexLinha}>
            {linha.map((celula, indexColuna) => {
              return (
                <MapItem item={celula} key={indexColuna}/>
              )
            })}
          </div>
        )
      }
      )}

    </div>
  )
}

export default App
