import {useEffect, useState} from 'react'

export const DltCountryModal = ({closeModal, database}) => {


    const [location, setLocation] = useState({
        id_country: "",
        country: ""
    })

    useEffect( ()=> {
        console.log(location)
    }, [location])

    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_country, [evt.target.name]: evt.target.value})
    }

    function deleteCountry (e) {
        e.preventDefault()
        fetch('/location/country', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(location)
        })
        .then(response => response.json()).then(response => {
            if (response.error === false) {
                alert(response.message)
            } else {
                alert("Primero debe eliminar las provincias y ciudades asociadas al país")
            }
        })
        .catch(e => console.log(e))
        closeModal()
    }


    return <div className="countryModal">
            <form className="countryModalBody" onSubmit={(e) => deleteCountry(e)}>
                <p>Ingrese el país que desea Eliminar:</p>
                <select defaultValue={"-Seleccione un país-"} type="text" name="country" onChange={(evt) => onSelect(evt)}>
                    <option disabled>-Seleccione un país-</option>
                    {database ? database.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="DltBtn" type="submit">Eliminar</button>
                </div>
            </form>
    </div>  
}