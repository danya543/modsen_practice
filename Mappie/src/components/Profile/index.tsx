import classNames from "classnames";

import { useAuth } from "@/hooks/useAuth";

import styles from '../style.module.css'

export const Profile = ({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) => {
    const { isAuth, email } = useAuth();
    return (
        <div className={classNames(
            !isOpen && styles.hidden,
            styles.modalProfile
        )}>
            <img src="/assets/close1.png" alt="" className={styles.cross} onClick={handleClose} />
            <img src="/assets/profile.png" alt="" />
            {isAuth && <p>Email: <span>{email}</span></p>}
            <button>Theme</button>
        </div>
    )
}
