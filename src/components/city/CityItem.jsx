import styles from './CityItem.module.css'
import { useFormatDate } from '../../hooks/useFomatDate';
import { Link } from 'react-router-dom';

export const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{useFormatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  )
}
