import { marqueeItems } from '../data/portfolio';
import styles from './Marquee.module.scss';

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className={styles.wrap}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={i % 4 === 0 ? `${styles.item} ${styles.accent}` : styles.item}>
            {item}
            <span className={styles.sep}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
