import {useEffect, useState, useContext} from 'react'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const DltStateModal = ({closeModal, database}) => {

    const {getStates} = useContext(LocationContext)

    const [renderStates, setRenderStates] = useState()

    const [location, setLocation] = useState({
        country: "",
        id_state: "",
        state: ""
    })

    useEffect( ()=> {
        if (location.country !== "" && location.state === "") {
            getStates(location.country).then(response => setRenderStates(response))
        }
        console.log(location)
    }, [location, getStates])

    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_state = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_state, [evt.target.name]: evt.target.value})
    }

    function deleteState (e) {
        e.preventDefault()
        fetch('/location/state', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location)
        })
        .then(response => response.json()).then(response => {
            if (response.error === false) {
                alert(response.message)
            } else {
                alert("Primero debe eliminar las ciudades asociadas al la provincia")
            }
        })
        .catch(e => console.log(e))
        closeModal()
    }


    return <div className="countryModal">
            <form className="countryModalBody" onSubmit={(e) => deleteState(e)}>
                <p>Ingrese el país:</p>
                <select defaultValue={"-Seleccione un país-"} type="text" name="country" onChange={evt => setLocation({...location, [evt.target.name]: evt.target.value})}>
                    <option disabled>-Seleccione un país-</option>
                    {database ? database.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia que desea eliminar: *</p>
                <select defaultValue={"-Seleccione una Provincia-"} type="text" name="state" onChange={evt => onSelect(evt)} required>
                    <option disabled>-Seleccione una Provincia-</option>
                    {renderStates ? renderStates.map(x => <option key={x.id_state} data-key={x.id_state}>{x.state}</option>) : null}
                </select>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="DltBtn" type="submit">Eliminar</button>
                </div>
            </form>
    </div>  
}