import MapItem from "../mapItem/mapItem"
import "./map.css"


export function Map (props) {
  return(
    <>
    <div className="map-title">Mapa do Tesouro</div>
      <div className="map-container">

        {props.mapa.map((linha, indexLinha) => {

          return (
            <div className="map-line" key={indexLinha}>

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
    </>
  )
}