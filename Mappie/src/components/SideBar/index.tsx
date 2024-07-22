import classNames from 'classnames';
import { useState } from 'react';

import { sidebarProps } from '@/entities/location';

import { Header } from '../Header';
import { Panel } from '../Panel';
import styles from '../style.module.css';

export const SideBar = ({ isLoaded, onSearch, radius, onChangeRadius }: sidebarProps) => {
  const [isActive, setIsActive] = useState(true)
  const handleSearch = () => {
    setIsActive(true)
  }
  const handleFav = () => {
    setIsActive(false)
  }

  return (
    <div
      className={classNames(
        {
          'w-25 d-flex': true
        },
        styles.sideBar
      )}
    >
      <Header onSearch={handleSearch} onFav={handleFav} />
      <Panel
        isLoaded={isLoaded}
        onSearch={onSearch}
        radius={radius}
        onChangeRadius={onChangeRadius}
        isActive={isActive}
      />
    </div>
  );
};
