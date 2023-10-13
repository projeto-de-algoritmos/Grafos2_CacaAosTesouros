import { FaWater, FaCoins } from 'react-icons/fa';
import { GiPalmTree, GiFishingBoat } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';


import './mapItem.css';
import { setTreasurePosition } from '../../store/gameSlice';

export function MapItem(props) {

  // usado para interagir com as variáveis do redux
  const dispatch = useDispatch();

  const SelectIcon = () => {
    switch (props.item) {
      case 0:
        return <FaWater />;
      case 1:
        return <GiPalmTree />;
      case 2:
        return <FaCoins />; // Tesouro
      case 3:
        return <GiFishingBoat />; // Pirata
      default:
        return '';
    }
  }

  const mapItemClassName = () => {
    switch (props.item) {
      case 0:
        return 'mapItem--water';
      case 1:
        return 'mapItem--land'; // Corrigido o nome da classe
      case 2:
        return 'mapItem--treasure'; // Usando a nova classe para o tesouro
      case 3:
        return 'mapItem--pirate'; // Usando a nova classe para o pirata
      default:
        return '';
    }
  };

  const selectTreasure = () => {
    if (props.item === 2) {
      // Insere a posição do tesouro para o redux
      dispatch(setTreasurePosition(props.itemPosition));
    }
  }
  
  return (
    <div 
      className={`mapItem ${mapItemClassName()}`} 
      onClick={() => selectTreasure()}
      >
      <SelectIcon />
    </div>
  );
}

export default MapItem;