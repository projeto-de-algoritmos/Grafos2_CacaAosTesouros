import {FaWater} from 'react-icons/fa';
import {GiPalmTree} from 'react-icons/gi'

import './mapItem.css';

export function MapItem(props) {

  function SelectIcon() {
    switch(props.item) {
      case 0:
        return <FaWater />
      default:
        return <GiPalmTree />
    }
  }

  const mapItemClassName = props.item === 0 ? 'mapItem--water' : 'mapItem--land';

  return (
    <div className={`mapItem ${mapItemClassName}`} key={props.key}>
      <SelectIcon />
    </div>
  );
}

export default MapItem;
