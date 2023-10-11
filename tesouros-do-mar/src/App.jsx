import './App.css'
import mapa from './backend/mapa.js'

function App() {

  const mapa2D = mapa;

  return (
    <div className='container'>
      {mapa2D.map((linha, indexLinha) => {
        return (
          <div className="linha" key={indexLinha}>
            {linha.map((celula, indexColuna) => {
              return (
                <div className="celula" key={indexColuna}>
                  {celula}
                </div>
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
