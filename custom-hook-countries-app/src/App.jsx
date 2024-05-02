import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { ListCountries } from "./components/ListCountries";
import { DetailCountry } from "./components/DetailCountry";
import { useCountry } from "./hooks/useCountry";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [listCountries, setListCountries] = useState([]);

  /*Input value that we transform into a regular expression to match the filter. */
  const expression = new RegExp(countryInput.toLowerCase());

  /*Api RestCountries */
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setListCountries(response.data);
    });
  }, []);

  const handleInput = (e) => {
    setCountryInput(e.target.value);
  };
  /*filter*/
  const filterCountries = listCountries.filter(country => {
    let countryNameNormalize = country.name.common.toLowerCase();
    if (expression.test(countryNameNormalize)) 
    return country;
  });

  //Se llama al hook que recibe por parámetro el país que se digita en el input
  //Posterior a esto, el hook hará la busqueda y retornará los detalles del país que coincida
  const countryDetail = useCountry(countryInput)
  
  

  
  return (
    <div  className="containerApp">
      <h1>Rest Countries 🗺️</h1>
      <div className="row g-3 align-items-center mt-2">
        <div className="col-auto mx-2">
          <label htmlFor="find_countries" className="col-form-label">
            Find countries
          </label>
        </div>
        <div className="col-4">
          <input
            type="text"
            id="find_countries"
            className="form-control"
            onChange={(e) => handleInput(e)}
            value={countryInput}
          />
        </div>
      </div>
      {/* Nested ternary conditional.*/}
      {filterCountries.length > 10 ? (
        countryInput.length === 0 ? (
          <h5 className="mt-3">
            ✍🏾Please write in the filter
            <div
              className="spinner-grow text-ligh spinner-grow-sm mx-1"
              role="status"
            ></div>
          </h5>
        ) : (
          <h5 className="mt-3">To many matches, specify another filter 🎯</h5>
        ) 
      ) : filterCountries.length === 1 && countryDetail !== 'Country not found' ? (
            <DetailCountry country={countryDetail[0]} key={countryDetail[0].population} />
      ) : filterCountries.length === 0 && countryInput.length > 1 ?
        (<h3 className="mt-2">Country not found... 🛸</h3>)
        : (
          filterCountries.map((country) => {
            return (
              <ListCountries country={country} key={country.population} />
            );
          })
        )
      }
    </div>
  );
}

export default App;
