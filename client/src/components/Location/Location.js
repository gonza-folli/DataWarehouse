import {useState,useEffect, useContext} from 'react'
import { LocationContext } from '../Context/LocationProvider/LocationProvider'
import { LocationTableHeader } from '../LocationTableHeader/LocationTableHeader'
import { AddCountryModal } from '../Modals/LocationModals/AddCountryModal'
import { AddStateModal } from '../Modals/LocationModals/AddStateModal'
import { AddCityModal } from '../Modals/LocationModals/AddCityModal'
import { DltCountryModal } from '../Modals/LocationModals/DltCountryModal'
import { DltStateModal } from '../Modals/LocationModals/DltStateModal'
import './Location.css'


export const Location = () => {

    const [renderCountry, setRenderCountry] = useState()
    const [renderState, setRenderState] = useState()
    const [renderCity, setRenderCity] = useState()

    const [cityEditData, setCityEditData] = useState()

    const {getCountries, getStates, getCities} = useContext(LocationContext)

    const [renderLocation, setRenderLocation] = useState({
        country: "",
        state: "",
        city: "",
        address: ""
    })

    useEffect(() => {
        if (renderLocation.country === "") {
            getCountries().then(data => setRenderCountry(data))
        }
        if (renderLocation.country !== "") {
            getStates(renderLocation.country).then(data => setRenderState(data))
        }
        if (renderLocation.state !== "") {
            getCities(renderLocation.country, renderLocation.state).then(data => setRenderCity(data))
        }
    }, [getCountries, renderLocation, getStates, getCities])

    //para desplegar el Modal Agregar Pais
    const [displayAddCountry, setDisplayAddCountry] = useState(false)
    const addCountry = () => { 
        setDisplayAddCountry(!displayAddCountry)
        getCountries().then(data => setRenderCountry(data)) 
    }

    //para desplegar el Modal Eliminar Pais
    const [displayDltCountry, setDisplayDltCountry] = useState(false)
    const dltCountry = () => {
        setDisplayDltCountry(!displayDltCountry)
        getCountries().then(data => setRenderCountry(data))
    }

    //para desplegar el Modal Agregar Provincia
    const [displayAddState, setDisplayAddState] = useState(false)
    const addState = () => {
        setDisplayAddState(!displayAddState)
        if (renderLocation.country !== "") {
            getStates(renderLocation.country).then(data => setRenderState(data))
        } 
    }
    
    //para desplegar el Modal Eliminar Provincia
    const [displayDltState, setDisplayDltState] = useState(false)
    const dltState = () => {
        setDisplayDltState(!displayDltState)
        if (renderLocation.country !== "") {
            getStates(renderLocation.country).then(data => setRenderState(data))
        }
    }

    //para desplegar el Modal Agregar Ciudad
    const [displayAddCity, setDisplayAddCity] = useState(false)
    const addCity = () => {
        setDisplayAddCity(!displayAddCity)
        if (renderLocation.country !== "" && renderLocation.state) {
            getCities(renderLocation.country, renderLocation.state).then(data => setRenderCity(data))
        }
        if (cityEditData) {
            setCityEditData(null)
        }
    }

    //funcion eliminar ciudad
    const renderCleanCities = () => {
        setRenderCity()
        getCities(renderLocation.country, renderLocation.state).then(data => setRenderCity(data))
    }

    //funcion editar ciudad
    const openEditModal = (data) => {
        setDisplayAddCity(true)
        setCityEditData(data)
    }

    return <section className='locationSection'>
    <h1 className="title">Países - Regiones - Ciudades</h1>
    <div className="LocationFunctions">
        <button className='AddBtn' onClick={() => setDisplayAddCountry(!displayAddCountry)} >Agregar País</button>
        <button className='AddBtn' onClick={() => setDisplayAddState(!displayAddState)} >Agregar Estado</button>
        <button className='AddBtn' onClick={() => setDisplayAddCity(!displayAddCity)}>Agregar Ciudad</button>
    </div>
    <div className="LocationFunctions">
        <button className='DltBtn' onClick={() => setDisplayDltCountry(!displayDltCountry)} >Eliminar País</button>
        <button className='DltBtn' onClick={() => setDisplayDltState(!displayDltState)}>Eliminar Estado</button>
    </div>
    <div className="LocationSearch">
        Selecciona un país:
        <select defaultValue={"Seleccione un País"} name="country" onChange={(evt) => setRenderLocation({...renderLocation, [evt.target.name]: evt.target.value})}>
            <option>Seleccione un país</option>
            {renderCountry ? renderCountry.map(data => <option key={data.id_country}>{data.country}</option>) : null}
        </select>
        Selecciona un Estado:
        <select defaultValue={"Seleccione una provincia"} name="state" onChange={(evt) => setRenderLocation({...renderLocation, [evt.target.name]: evt.target.value})}>
            <option>Seleccione una provincia</option>
            {renderState ? renderState.map(data => <option key={data.id_state}>{data.state}</option>) : null}
        </select>
    </div>
    {displayAddCountry ? <AddCountryModal database={renderCountry} closeModal={addCountry}/> : null}
    {displayDltCountry ? <DltCountryModal database={renderCountry} closeModal={dltCountry}/> : null}
    {displayAddState ? <AddStateModal countryData={renderCountry} closeModal={addState}/> : null}
    {displayDltState ? <DltStateModal database={renderCountry} closeModal={dltState}/> : null}
    {displayAddCity ? <AddCityModal countryData={renderCountry} closeModal={addCity} editData={cityEditData}/> : null}
    {renderCity ? <LocationTableHeader renderData={renderCity} renderCleanCities={renderCleanCities} openEditModal={openEditModal}/> : <h3>Para comenzar, completa ambos campos de búsqueda</h3>}
    </section>

}