import { createContext} from "react";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const getSubregions = function (region) {
        let response = fetch(`/location?region=${region}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getAllSubregions = function () {
        let response = fetch(`/location/subregions`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCountriesFromSubreg = function (subreg) {
        let response = fetch(`/location/subregions?subregion=${subreg}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCountries = function () {
        let response = fetch('/location', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getStates = function (country) {
        let response = fetch(`/location?country=${country}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCities = function (country, state) {
        let response = fetch(`/location?country=${country}&state=${state}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCitiesFromCountry = function (id_country) {
        let response = fetch(`/location?id_country=${id_country}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }


    const getAvailableCities = function () {
        let response = fetch(`/location/city`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getAddressFromCities = function (city) {
        let response = fetch(`/location?city=${city}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }


    return <LocationContext.Provider value={{getCountries, getAllSubregions, getCountriesFromSubreg, getStates, getCities, getSubregions, getCitiesFromCountry, getAvailableCities, getAddressFromCities}}>
        {children}
    </LocationContext.Provider>
}