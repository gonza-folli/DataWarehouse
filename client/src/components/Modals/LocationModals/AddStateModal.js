import {useContext, useEffect, useState } from 'react'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddStateModal = ({closeModal, countryData}) => {

    const {getStates} = useContext(LocationContext)

    const [statesDatabase, setStatesDatabase] = useState()

    const [location, setLocation] = useState({
        id_country: "",
        country: "",
        state: ""
    })

    useEffect(() => {
        if (location.country !== "" && location.state === "") {
            getStates(location.country).then(response => setStatesDatabase(response))
        }
    }, [getStates, location])


    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_country, [evt.target.name]: evt.target.value})
    }

    function saveState (e) {
        e.preventDefault()
        let findDuplicate = statesDatabase.find( x => x.state.toLowerCase() === location.state.toLowerCase())
        if (findDuplicate) {
            alert("El estado ya existe")
        } else {
            fetch('/location/state', {
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
            <form className="countryModalBody" onSubmit={(e) => saveState(e)}>
                <p>Ingrese el País donde se encuentra el Estado: *</p>
                <select defaultValue={"-Seleccione un País-"} type="text" name="country" onChange={(evt) => onSelect(evt)} required>
                    <option disabled>-Seleccione un País-</option>
                    {countryData ? countryData.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia que desea agregar: *</p>
                <input type="text" name="state" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required></input>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  
}