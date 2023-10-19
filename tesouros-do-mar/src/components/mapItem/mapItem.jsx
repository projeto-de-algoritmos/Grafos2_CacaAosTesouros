import React, { useEffect, useRef, useState } from 'react';
import { FaWater, FaCoins } from 'react-icons/fa';
import { GiPalmTree, GiFishingBoat } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import './mapItem.css';
import { setTreasurePosition, treasureSelected } from '../../store/gameSlice';

export function MapItem({item, itemPosition } = props) {
  // usado para interagir com as variáveis do redux
  const dispatch = useDispatch();
  const treasurePosition = useSelector((state) => state.game.treasurePosition);
  const isTreasureSelected = useSelector((state) => state.game.isTreasureSelected);
  const shortestPath = useSelector((state) => state.game.shortestPath);
  const [isPartOfPath, setIsPartOfPath] = useState(false);

  useEffect(() => {
    if (shortestPath.length > 0) {
      shortestPath.forEach((position) => {
          if (position[0] === itemPosition[0] && position[1] === itemPosition[1]) {
            setIsPartOfPath(true);
          }
      });
    }
  }, [shortestPath, setIsPartOfPath]);

  const SelectIcon = () => {
    switch (item) {
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
    let className = '';
    switch (item) {
      case 0:
        className = 'mapItem--water';
        break;
      case 1:
        className = 'mapItem--land';
        break;
      case 2:
        className = 'mapItem--treasure';
        break;
      case 3:
        className = 'mapItem--pirate';
        break;
      default:
        break;
    }
    if (isPartOfPath) {
      className += ' mapItem--path';
    }
    return className;
  };

  const selectTreasure = () => {
    if (item === 2) {
      // Insere a posição do tesouro para o redux
      dispatch(setTreasurePosition(itemPosition));
      // Muda a variável isTreasureSelected para true
      dispatch(treasureSelected())
    }
  }

  const selectedTreasureClassName = () => {
    if(isTreasureSelected){
      if (treasurePosition && treasurePosition[0] === itemPosition[0] && treasurePosition[1] === itemPosition[1]) {
        return 'treasure--selected';
      }
      else if(item === 2) {
        return 'treasure--not-selected';
      }
    }
    return '';
  }
  
  return (
    <div 
      className={`mapItem ${mapItemClassName()} ${selectedTreasureClassName()}`} 
      onClick={() => selectTreasure()}
    >
      <SelectIcon />
    </div>
  );
}

export default MapItem;