import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import { BackButton } from "../button/BackButton";
import { Button } from "../button/Button";
import { Message } from "../message/Message";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import DatePicker from "react-date-picker";
import styles from "./Form.module.css";
import { useCities } from "../../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export const Form = () => {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;
    fetchCityData();
  }, [lat, lng]);

  const fetchCityData = async () => {
    try {
      setIsLoadingGeocoding(true);
      setGeocodingError("");

      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();

      if (!data.countryName)
        throw new Error(
          "That doesn't seem to be a city. Click somewhere else 🚀"
        );

      setCityName(data.city || data.locality || "");
      setCountry(data.countryName);
      setEmoji(convertToEmoji(data.countryCode));
    } catch (error) {
      console.error(error);
      setGeocodingError(error.message);
    } finally {
      setIsLoadingGeocoding(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }

    await createCity(newCity);
    navigate('/app/cities')
  };

  if (geocodingError) return <Message message={geocodingError} />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          value={date}
          format="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
};
