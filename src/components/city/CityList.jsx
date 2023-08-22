import { Message } from "../message/message";
import { Spinner } from "../spinner/Spinner";
import { CityItem } from "./CityItem";
import styles from "./CityList.module.css";

export const CityList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};
