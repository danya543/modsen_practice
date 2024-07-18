import { Input } from '@/ui/Input';

import styles from '../style.module.css';

export const Radius = ({
  radius,
  onChange
}: {
  radius: number;
  onChange: (e: { target: { value: string } }) => void;
}) => {
  return (
    <div className={styles.radius}>
      <h6>В радиусе</h6>
      <Input value={radius.toString()} type={'text'} onChange={onChange} />
      км
    </div>
  );
};
