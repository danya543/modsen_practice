import classNames from 'classnames';

import { Favourites } from '@/components/Favourites'
import { panelProps } from '@/entities/location';

import { Features } from '../Features';
import { Search } from '../Search';
import styles from '../style.module.css';


export const Panel = ({ isLoaded, onSearch, radius, onChangeRadius, isActive }: panelProps) => {

    return (
        <div
            className={classNames(
                {
                    'w-75': true
                },
                styles.panel
            )}
        >
            <Search isLoaded={isLoaded} onSearch={onSearch} />
            {isActive ? <Features radius={radius} onChangeRadius={onChangeRadius} /> : <Favourites />}
            <button className={styles.collapsebtn}>
                <img src="/assets/open.svg" alt="" />
            </button>
        </div >
    );
};
