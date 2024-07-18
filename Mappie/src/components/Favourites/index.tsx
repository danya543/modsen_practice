import { InfoWindow } from "../InfoWindow";
import styles from '../style.module.css'

export const Favourites = () => {
  const data = [{ primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }, { primaryText: 'a', secondaryText: 'b', img: '' }]
  return (data.length >= 1 ?
    <div className={styles.favouriteContainer}>
      <h6>Избранное</h6>
      {data.map(el =>
        <InfoWindow primaryText={el.primaryText} secondaryText={el.secondaryText} image={el.img} />)}
    </div>
    :
    <div>No favourite places</div>
  );
};
