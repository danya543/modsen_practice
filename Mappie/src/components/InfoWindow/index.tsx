import styles from '../style.module.css';

export const InfoWindow = ({
  primaryText,
  secondaryText,
  image,
}: {
  primaryText: string;
  secondaryText: string | null;
  image: string;
}) => {
  // @ts-ignore
  const closeWindow = (e) => {
    e.target.parentNode.parentNode.remove();
  };

  return (
    <div className={styles.infoWindow}>
      <img src={image ? image : '/assets/noimage.png'} alt="" className={styles.image} />
      {/* <img src="/assets/close1.png" alt="" className={styles.cross} onClick={closeWindow} /> */}
      <h3>{primaryText}</h3>
      <p>{secondaryText}</p>
      <div className={styles.buttons}>
        <button className={styles.bookmarkbtn} onClick={closeWindow}><img src="/assets/book_btn.png" alt="" />Сохранено</button>
        <button className={styles.routebtn} ><img src="/assets/route.png" alt="" />Маршрут</button>
      </div>
    </div>
  );
};
