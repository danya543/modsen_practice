import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { clearUser } from '@/store/reducers/userSlice';

import { Profile } from '../Profile';
import styles from '../style.module.css'

export const Header = ({ onSearch, onFav }: { onSearch: () => void, onFav: () => void }) => {
    const { isAuth } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const onClick = () => {
        setIsOpenMenu(prev => !prev)
    }
    const handleActive = () => {
        setIsOpenMenu(false);
        isAuth ? dispatch(clearUser()) : navigate('/signin');
    }

    const handleProfile = () => {
        setIsOpenProfile(prev => !prev)
        setIsOpenMenu(false);
    }
    const handleClose = () => {
        setIsOpenProfile(false);
    }

    return (
        <div className={styles.profile} >
            <img className={styles.logo} src="/assets/favicon.png" alt="" />
            <button className={styles.search} onClick={onSearch}>
                <img src="/assets/search.svg" alt="" />
            </button>
            {isAuth && <button className={styles.bookmark} onClick={onFav}>
                <img src="/assets/favourite.svg" alt="" />
            </button>}
            <button onClick={onClick} className={styles.profilebtn}><img src="/assets/user.png" alt="" /></button>
            <div className={classNames(
                !isOpenMenu && styles.hidden,
                styles.profilemenu
            )}>
                <p onClick={handleProfile}>Profile</p>
                <p onClick={handleActive}>{isAuth ? 'Log out' : 'Sign in'}</p>
            </div>
            <Profile isOpen={isOpenProfile} handleClose={handleClose} />
        </div >
    )
}
