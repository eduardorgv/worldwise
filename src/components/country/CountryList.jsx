import { CountryItem } from "./CountryItem";
import { Message } from "../message/message";
import { Spinner } from "../spinner/Spinner";
import styles from "./CountryList.module.css";
import { useCities } from "../../contexts/CitiesContext";

export const CountryList = () => {
  const { cities, isLoading } = useCities();
  
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji, id: city.id }];
    else return arr;
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
};
