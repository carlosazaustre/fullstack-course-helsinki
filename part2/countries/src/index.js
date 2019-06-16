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

  return (
    <>
      {data.map(country => <CountryDetail key={country.name} show={false} name={country.name} />)}
    </>
  );
}


const CountryDetail = props => {
  const [countryDetail, setCountryDetail] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${props.name}`)
      .then(response => {
        setCountryDetail(response.data[0]);
      })
  }, [props.name]);

  return show
    ? (<div>
        <h2>{countryDetail.name}</h2>
        <p>capital {countryDetail.capital}</p>
        <p>population {countryDetail.population}</p>
        <h3>Languages</h3>
        <ul>
          {countryDetail.languages && countryDetail.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <img src={countryDetail.flag} height="150" alt={`${countryDetail.name} flag`} />
      </div>)
    : (<p key={countryDetail.name}>
        {countryDetail.name}
        <button onClick={() => setShow(!show)}>show</button>
      </p>)
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

