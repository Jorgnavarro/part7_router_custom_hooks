/* eslint-disable react/prop-types */
import { useState } from "react";
import { getId } from "../utils/getId";
import { DetailCountry } from "./DetailCountry";

/**
 *
 * @param country  Receives an array of objects with several countries.
 * @returns A list with the country name and a button to show the details.
 */

export function ListCountries({ country }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="container m-2 row justify-content-center">
      <ul className="list-group col-6">
        <div className="container-countries">
          <li className="list-group-item list-group-item-primary" key={getId}>
            {country.name.common}
          </li>
          <button
            className="btn btn-outline-light"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
        </div>
        <>{showDetails ? <DetailCountry country={country} /> : undefined}</>
      </ul>
    </div>
  );
}
