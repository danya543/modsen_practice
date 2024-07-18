import classNames from 'classnames';

import styles from './styles.module.css';

export const Input = ({
  type,
  className,
  placeholder,
  value,
  onChange,
  isActive
}: {
  type: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: { target: { value: string } }) => void;
  isActive?: boolean;
}) => {
  return (
    <input
      type={type}
      className={classNames(
        {
          [styles.input]: true
        },
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isActive}
    />
  );
};
