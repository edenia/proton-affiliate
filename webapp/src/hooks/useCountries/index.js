import { useState, useEffect } from 'react'
import countries from 'i18n-iso-countries'
import english from 'i18n-iso-countries/langs/en.json'
import spanish from 'i18n-iso-countries/langs/es.json'

import States from './StateData'

countries.registerLocale(english)
countries.registerLocale(spanish)

const useCountries = language => {
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => {
    if (language) {
      const result = countries.getNames(language)
      const countriesArray = []

      for (const [key, value] of Object.entries(result)) {
        const states = (States || []).filter(
          state => state.country_code === key
        )
        countriesArray.push({ key, value, states })
      }

      setCountriesData(countriesArray)
    }
  }, [language])

  return countriesData
}

export default useCountries
