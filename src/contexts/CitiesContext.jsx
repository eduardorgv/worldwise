import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { initialStateCity, reducerCity } from "../reducer/cityReducer";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

export const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducerCity,
    initialStateCity
  );

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      console.error("Error at getting cities ❌: ", error);
      dispatch({
        type: "rejected",
        payload: "Error at getting cities ❌",
      });
    }
  };

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      console.error("Error at getting the city ❌: ", error);
      dispatch({
        type: "rejected",
        payload: "Error at getting the city ❌",
      });
    }
  };

  const createCity = async (newCity) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      console.error("Error at creating the city ❌: ", error);
      dispatch({
        type: "rejected",
        payload: "Error at creating the city ❌",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      console.error("Error at deleting the city ❌: ", error);
      dispatch({
        type: "rejected",
        payload: "Error at deleting the city ❌",
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "Error ❌: CitiesContext was used outside the CitiesProvider"
    );
  return context;
};
