import './AddCountryModal.css'
import {useContext, useEffect, useState } from 'react'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCountryModal = ({closeModal, database}) => {

    const {getSubregions} = useContext(LocationContext)

    const [renderSubregion, setRenderSubregion] = useState()

    const [location, setLocation] = useState({
        region: "",
        subregion: "",
        country: ""
    })


    useEffect(() => {
        if (location.region !== "" && location.country === "") {
            getSubregions(location.region).then(response => setRenderSubregion(response))
        }
    }, [location, getSubregions])


    function saveCountry (e) {
        e.preventDefault()
        let findDuplicate = database.find( x => x.country.toLowerCase() === location.country.toLowerCase())
        if (findDuplicate) {
            alert("El pais ya existe")
        } else {
            fetch('/location/country', {
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
            <form className="countryModalBody" onSubmit={(e) => saveCountry(e)}>
                <p>Ingrese el Continente donde se encuentra el país: *</p>
                <select defaultValue={"-Seleccione un continente-"} type="text" name="region" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required>
                    <option disabled>-Seleccione un continente-</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
                <p>Ingrese la SubRegión que desea agregar:</p>
                <select defaultValue={"-Seleccione una Sub región-"} type="text" name="subregion" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})}>
                    <option disabled>-Seleccione una Sub región-</option>
                    {renderSubregion ? renderSubregion.map(x => <option key={x.subregion}>{x.subregion}</option>) : null}
                </select>
                <p>Ingrese el País que desea agregar: *</p>
                <input type="text" name="country" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required></input>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  
}