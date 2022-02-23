import {useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCityModal = ({closeModal, countryData, editData}) => {

    const {getStates, getCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

// ----------- Seccion agregar ciudad ------------------------------
    const [renderStates, setRenderStates] = useState()

    const [cityDisabled, setCityDisabled] = useState(true)

    const [location, setLocation] = useState({
        id_country: "",
        country: "",
        id_state: "",
        state: "",
        id_city: "",
        city: "",
        address: ""
    })

    useEffect(() => {
        if (location.country !== "" && location.state === "") {
            getStates(location.country).then(response => setRenderStates(response))
        }
    }, [getStates, getCities, location])

    useEffect(() => {
        console.log(location)
    }, [location])

    function onSelectCountry (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        const state = ""
        const id_state = ""
        const city = ""
        const address = ""
        if (editData) { //sólo aplica si estoy editando
            setNewLocation({...newLocation, id_country, id_state, state, city, address, [evt.target.name]: evt.target.value})
        } else { // solo aplica para agregar nueva ciudad
            setLocation({...location, id_country, state, [evt.target.name]: evt.target.value})
        }
    }

    function onSelectState (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_state = (evt.target.options[selectedIndex].getAttribute('data-key'))
        const city = ""
        const address = ""
        if (editData) { //sólo aplica si estoy editando
            setNewLocation({...newLocation, id_state, city, address, [evt.target.name]: evt.target.value})
        } else { // solo aplica para agregar nueva ciudad
            setLocation({...location, id_state, [evt.target.name]: evt.target.value})
        }
        setCityDisabled(false)
    }


    async function saveCity (e) {
        e.preventDefault()
        if (location.state !== "" && location.address !== "" && location.city !== "") {
            await fetch('/location/city', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(location)
            })
            .then(response => response.json()).then(data => {
                if (data.error === false) {
                    Swal.fire({
                        icon: 'success',
                        text: `${data.message}`,
                    })
                    closeModal()
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${data.message}`,
                    })
                }
            })
            .catch(e => console.log(e))
        } else {
            Swal.fire({
                icon: 'error',
                text: `Debe completar TODOS los datos`,
            })
        }
    }

// ----------- Seccion editar ciudad ------------------------------

    const [newLocation, setNewLocation] = useState({
        id_country: "",
        country: "",
        id_state: "",
        state: "",
        id_city: "",
        city: "",
        address: ""
    })

    useEffect(() => {
        if (editData) {
            setNewLocation({
                id_country: editData.id_country,
                country: editData.country,
                id_state: editData.id_state,
                state: editData.state,
                id_city: editData.id_city,
                city: editData.city,
                address: editData.address
            })
        }
    }, [editData])

    //actualizar listados de paises, provincias
    useEffect(() => {
        if (editData) {
            if (newLocation.country === editData.country && newLocation.state === editData.state && newLocation.city === editData.city) {
                getStates(newLocation.country).then(response => setRenderStates(response))
            }
            if (newLocation.country !== "" & newLocation.state === "" ) {
                setRenderStates(null)
                if (newLocation.country !== "" ) { 
                    getStates(newLocation.country).then(response => setRenderStates(response))
                }
            }
        }
    }, [newLocation, getStates, editData, location])
    


    async function editCity () {
        let findChange = [editData].find( x => 
            parseInt(x.id_city) === parseInt(newLocation.id_city) &&
            x.city.toLowerCase() === newLocation.city.toLowerCase() && 
            x.address.toLowerCase() === newLocation.address.toLowerCase() &&
            x.state.toLowerCase() === newLocation.state.toLowerCase() &&
            x.country.toLowerCase() === newLocation.country.toLowerCase()
        )
        if (findChange) {
            Swal.fire({
                icon: 'error',
                text: `No se ha modificado ningún dato`,
            })
        } else {
            await fetch('/location', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newLocation)
            })
            .then(response => response.json()).then(data => {
                if (data.error === false) {
                    Swal.fire({
                        icon: 'success',
                        text: `La dirección ${newLocation.address} en la ciudad ${newLocation.city} se ha modificado correctamente`,
                    })
                    closeModal()
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${data.message}`,
                    })
                }
            })
            .catch(e => console.log(e))
            closeModal()
        }
    }


    return <div className="genericModal">
            <form className="genericModalBody" onSubmit={(e) => saveCity(e)}>
                {editData ? <p>Para que se habiliten los campos debe volver a cargar desde el País!</p> : null}
                <p>Ingrese el País donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione un País-"} type="text" name="country" onChange={(evt) => onSelectCountry(evt)} required>
                    {editData ? <option>{newLocation.country}</option> : <option>-Seleccione un País-</option>}
                    {countryData ? countryData.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione una Provincia-"} type="text" name="state" onChange={(evt) => onSelectState(evt)} required>
                    {newLocation.id_state !== "" ? <option>{newLocation.state}</option> : <option>-Seleccione una Provincia-</option>}
                    {renderStates ? renderStates.map(x => <option key={x.id_state} data-key={x.id_state}>{x.state}</option>) : null}
                </select>

                <p>Ingrese la Ciudad que desea agregar: *</p>
                {editData ? 
                    <input value={newLocation.city} type="text" name="city" onChange={(evt) => setNewLocation({...newLocation, [evt.target.name]: evt.target.value})} required disabled={cityDisabled}></input> 
                    : 
                    <input type="text" name="city" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required disabled={cityDisabled}></input>}
                
                <p>Ingrese domicilio que desea agregar:</p>
                {editData ? 
                    <input value={newLocation.address} type="text" name="address" onChange={(evt) => setNewLocation({...newLocation, [evt.target.name]: evt.target.value})} disabled={cityDisabled}></input>
                    :
                    <input type="text" name="address" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} disabled={cityDisabled}></input>}

                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    {editData ? 
                        <button className="saveBtn" type="button" onClick={() =>editCity()}>Guardar Cambios</button>
                    :
                        <button className="saveBtn" type="submit">Guardar</button>}
                </div>
            </form>
    </div>  
}