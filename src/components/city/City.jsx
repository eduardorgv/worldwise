import { useParams, useSearchParams } from "react-router-dom";
import styles from './City.module.css'

export const City = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.mapContainer}>
      <h1>City {id}</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button
        onClick={() => setSearchParams({ lat: 23, lng: 50 })}
      >
        Change position
      </button>
    </div>
  );
};
