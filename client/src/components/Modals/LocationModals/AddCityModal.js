import {useContext, useEffect, useState } from 'react'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCityModal = ({closeModal, countryData}) => {

    const {getStates, getCities} = useContext(LocationContext)

    const [renderStates, setRenderStates] = useState()
    const [citiesDatabase, setCitiesDatabase] = useState()


    const [location, setLocation] = useState({
        id_country: "",
        country: "",
        id_state: "",
        state: "",
        city: "",
        address: ""
    })

    useEffect(() => {
        if (location.country !== "" && location.state === "") {
            getStates(location.country).then(response => setRenderStates(response))
        }
        if (location.state !== "" && location.city === "") {
            getCities(location.country, location.state).then(response => setCitiesDatabase(response))
        }
    }, [getStates, getCities, location])


    function onSelectCountry (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_country, [evt.target.name]: evt.target.value})
    }

    function onSelectState (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_state = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_state, [evt.target.name]: evt.target.value})
    }


    function saveCity (e) {
        e.preventDefault()
        let findDuplicate = citiesDatabase.find( x => 
            x.city.toLowerCase() === location.city.toLowerCase() && 
            x.address.toLowerCase() === location.address.toLowerCase() 
        )
        if (findDuplicate) {
            alert("La direccion ya existe")
        } else {
            fetch('/location/city', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(location)
            })
            .then(response => response.json()).then(response => console.log(response))
            .catch(e => console.log(e))
            closeModal()
        }
    }


    return <div className="countryModal">
            <form className="cityModalBody" onSubmit={(e) => saveCity(e)}>
                <p>Ingrese el País donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione un País-"} type="text" name="country" onChange={(evt) => onSelectCountry(evt)} required>
                    <option disabled>-Seleccione un País-</option>
                    {countryData ? countryData.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione una Provincia-"} type="text" name="state" onChange={(evt) => onSelectState(evt)} required>
                    <option disabled>-Seleccione una Provincia-</option>
                    {renderStates ? renderStates.map(x => <option key={x.id_state} data-key={x.id_state}>{x.state}</option>) : null}
                </select>
                <p>Ingrese la Ciudad que desea agregar: *</p>
                <input type="text" name="city" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required></input>
                <p>Ingrese domicilio que desea agregar:</p>
                <input type="text" name="address" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})}></input>

                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  
}