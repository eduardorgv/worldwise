import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, Product, Pricing, NotFound, AppLayout, Login } from "./pages";
import { City, CityList, CountryList, Form } from "./components";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to='cities' />}
            />
            <Route
              path="cities"
              element={<CityList />}
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<CountryList />}
            />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
