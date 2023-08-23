import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

export const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Error ❌: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
        value={{
            cities,
            isLoading
        }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export const useCities = () => {
    const context = useContext(CitiesContext);
    if(context === undefined)
        throw new Error('Error ❌: CitiesContext was used outside the CitiesProvider');
    return context;
}
