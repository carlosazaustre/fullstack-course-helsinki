import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from '../../phonebook/node_modules/axios';


const CountriesList = ({ list, search }) => {
  const data = list.filter(country =>
    country.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (data.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (data.length === 1) {
    return <CountryDetail name={data[0].name.toLowerCase()}/>
  }

  return (
    <>
      {data.map(country => (<p key={country.name}>{country.name}</p>))}
    </>
  );
}


const CountryDetail = ({ name }) => {
  console.log('name', name)
  const [countryDetail, setCountryDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(response => {
        setCountryDetail(response.data[0]);
      })
  }, [name]);

  return (
    <div>
      <h2>{countryDetail.name}</h2>
      <p>capital {countryDetail.capital}</p>
      <p>population {countryDetail.population}</p>
      <h3>Languages</h3>
      <ul>
        {countryDetail.languages && countryDetail.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={countryDetail.flag} height="150" alt={`${countryDetail.name} flag`} />
    </div>
  );
}


const App = props => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const onChangeHandler = event => {
    setCountryName(event.target.value);
  }

  return (
    <div>
      find countries
      <input onChange={onChangeHandler}/>
      <CountriesList list={countries} search={countryName}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

