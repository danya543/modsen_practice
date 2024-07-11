import classNames from 'classnames';

import { sidebarProps } from '@/entities/location';

import { Features } from '../Features';
import { Radius } from '../Radius';
import { Search } from '../Search';
import styles from '../style.module.css';


export const Panel = ({ isLoaded, onSearch, radius, onChangeRadius }: sidebarProps) => {
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
            <Features />
            <Radius radius={radius} onChange={onChangeRadius} />
        </div>
    );
};
