import { useState, useEffect } from "react"

import axios from 'axios'

import CountryView from "./components/CountryView"
import Countries from "./components/Countries"

const App = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(null)

  const handleQueryChange = (event) => setQuery(event.target.value)

  const displayCountries = () => {
    if (filteredCountries?.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries?.length === 1) {
      const selectedCountry = filteredCountries[0]
      return <CountryView country={selectedCountry} />
    } else {
      return <Countries countries={filteredCountries} />
    }
  }

  useEffect(() => {
    console.log('filterting countries with query', query)

    if (query.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    if (query) {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase())))
    }
  }, [query, countries])

  useEffect(() => {
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    axios.get(url).then(response => {
      setCountries(response.data)
      console.log('all countries', response.data)
    })
  }, [])

  return (
    <div>
      <h1>Countries</h1>
      find countries <input value={query} onChange={handleQueryChange} />
      {displayCountries()}
    </div>
  )
}

export default App