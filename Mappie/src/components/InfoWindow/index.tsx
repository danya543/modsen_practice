import styles from '../style.module.css';

export const InfoWindow = ({
  primaryText,
  secondaryText,
  image
}: {
  primaryText: string;
  secondaryText: string;
  image?: string;
}) => {
  // @ts-ignore
  const closeWindow = (e) => {
    e.target.parentNode.remove();
  };

  return (
    <div className={styles.infoWindow}>
      <img src={image ? image : 'src/assets/noimage.png'} alt="" className={styles.image} />
      <img src="src/assets/close1.png" alt="" className={styles.cross} onClick={closeWindow} />
      <h3>{primaryText}</h3>
      <p>{secondaryText}</p>
    </div>
  );
};
