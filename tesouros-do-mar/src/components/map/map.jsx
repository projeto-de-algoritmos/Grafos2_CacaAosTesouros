import MapItem from "../mapItem/mapItem"
import "./map.css"

export function Map({ mapa } = props) {

return (
  <>
    <div className="map-title">Mapa do Tesouro</div>
    <div className="map-subtitle">clique em algum dos tesouros!</div>
    <div className="map-container">
      {mapa.map((linha, indexLinha) => {
        return (
          <div className="map-line" key={indexLinha}>
            {linha.map((celula, indexColuna) => {
              const currentPosition = [indexLinha, indexColuna];
              return (
                <MapItem
                  item={celula}
                  itemPosition={currentPosition}
                  key={`${indexLinha}-${indexColuna}`}
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