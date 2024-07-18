import styles from '../style.module.css'

export const Profile = ({ isActive, onSearch, onFav }: { isActive: boolean, onSearch: () => void, onFav: () => void }) => {
    /*     const search = (e) => { e.preventDefault() }
        const favourite = (e) => { e.preventDefault() } */
    return (
        <div className={styles.profile} >
            <img className={styles.logo} src="src/assets/favicon.png" alt="" />
            <button className={styles.search} onClick={onSearch}>
                <img src="src/assets/search.svg" alt="" />
            </button>
            {isActive && <button className={styles.bookmark} onClick={onFav}>
                <img src="src/assets/favourite.svg" alt="" />
            </button>}
        </div>
    )
}
