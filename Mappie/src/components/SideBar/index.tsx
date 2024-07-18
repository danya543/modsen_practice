import classNames from 'classnames';

import { sidebarProps } from '@/entities/location';

import { Panel } from '../SidBarPanel';
import styles from '../style.module.css';

export const SideBar = ({ isLoaded, onSearch, radius, onChangeRadius }: sidebarProps) => {
  return (
    <div
      className={classNames(
        {
          'w-25 d-flex': true
        },
        styles.sideBar
      )}
    >
      <div className={styles.profile}>left part</div>
      <Panel
        isLoaded={isLoaded}
        onSearch={onSearch}
        radius={radius}
        onChangeRadius={onChangeRadius}
      />
    </div>
  );
};
