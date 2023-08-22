import styles from './CityItem.module.css'
import { useFormatDate } from '../../hooks/useFomatDate';

export const CityItem = ({ city }) => {
  const { cityName, emoji, date } = city;

  return (
    <li className={styles.cityItem}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{useFormatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
    </li>
  )
}
