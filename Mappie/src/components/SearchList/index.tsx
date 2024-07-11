import { ISearchList } from '@/entities/SearchList';

import styles from '../style.module.css';

export const SearchList = ({ data, handleSelect }: ISearchList) => {
  return (
    <ul className={styles.searchList}>
      {data.map((item) => (
        <li
          className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
          role="button"
          key={item.place_id}
          onClick={handleSelect(item)}
        >
          <strong>{item.structured_formatting.main_text}</strong>{' '}
          <small>{item.structured_formatting.secondary_text}</small>
        </li>
      ))}
    </ul>
  );
};
