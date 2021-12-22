import { createContext, useState} from "react";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {

    const getSubregions = function (region) {
        let response = fetch(`/location?region=${region}`)
        return response.then(data => data.json())
    }

    const getCountries = function () {
        let response = fetch('/location')
        return response.then(data => data.json())
    }

    const getStates = function (country) {
        let response = fetch(`/location?country=${country}`)
        return response.then(data => data.json())
    }

    const getCities = function (country, state) {
        let response = fetch(`/location?country=${country}&state=${state}`)
        return response.then(data => data.json())
    }

    //para desplegar el Modal Eliminar 1 ciudad
    const [displayDltCity, setDisplayDltCity] = useState(false)
    const dltCity = () => setDisplayDltCity(!displayDltCity)

    const [delCityData, setDelCityData] = useState()

    const delLocation = (renderData) => {
        dltCity()
        setDelCityData(renderData)
    }


    return <LocationContext.Provider value={{getCountries, getStates, getCities, getSubregions, delLocation, displayDltCity, delCityData, dltCity}}>
        {children}
    </LocationContext.Provider>
}