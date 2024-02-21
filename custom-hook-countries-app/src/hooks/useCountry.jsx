/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (country) => {
  const [countryDetail, setCountryDetail] = useState([]);

 
  /*Api RestCountries endpoint por nombre */
  useEffect(() => {
    if (country) {
      // Verificamos si el nombre del país está definido
      axios
        .get(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
          setCountryDetail(response.data);
        })
        .catch((error) => {
          if (error.response) {
            setCountryDetail("Country not found");
          }
        });
    } else {
      // Si el nombre es undefined o "", no hacemos la petición
      setCountryDetail("No country name provided");
    }
  }, [country]);

  return countryDetail;
};
