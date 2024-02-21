/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { getId } from "../utils/getId";

/**
 * 
 * @param country Receives the object with the country information brought from the country Rest API. 
 * @returns A card with the details of the two APIS, weather and Rest countries.
 */
export function DetailCountry({ country }) {
    console.log(country);
    const api_key = import.meta.env.VITE_API_WEATHER
    console.log(api_key)
    const languagesArr = Object.values(country.languages);
    console.log(languagesArr);
    const [dataWheater, setDataWheater] = useState({})
    console.log(dataWheater);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name.common}`)
            .then(response => {
                console.log(response)
                setDataWheater(response.data)
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching weather data: ", error);
                setLoading(false);
            })
    }, [api_key, country.name.common])
    console.log(loading);
    console.log(dataWheater)
    return (
        <div className="container m-2 row justify-content-center">
            <div className="card"  style={{ width: "18rem" }}>
                <img src={country.flags.png} className="card-img-top mt-2" alt="Countrie Flag" id="img-card" />
                <div className="card-body">
                    <h5 className="card-title">{country.name.common}</h5>
                    <p className="card-text">Capital: {country.capital} </p>
                    <p className="card-text">Population: {country.population}</p>
                    <h6>Languages</h6>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        languagesArr.map((language) => {
                            return <li key={getId()} className="list-group-item">{language}</li>
                        })
                    }
                </ul>
                <div className="card-body">
                    <h5 className="card-title">
                        Weather in {country.capital}
                    </h5>
                    {loading ? 
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :<>
                            <p className="card-text">Temperature: {dataWheater?.current?.temperature} Celcius</p>
                            <img src={dataWheater?.current?.weather_icons[0]} alt="Weather Icon"/>
                            <p>Wind: {dataWheater?.current?.wind_speed} mph direction {dataWheater?.current?.wind_dir}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}