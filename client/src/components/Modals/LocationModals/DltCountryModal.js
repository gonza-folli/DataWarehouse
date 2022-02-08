import {useState} from 'react'
import Swal from 'sweetalert2'

export const DltCountryModal = ({closeModal, database}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const [location, setLocation] = useState({
        id_country: "",
        country: ""
    })

    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_country, [evt.target.name]: evt.target.value})
    }

    async function deleteCountry (e) {
        e.preventDefault()
        await fetch('/location/country', {
            method: 'DELETE',
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
                    text: `El pais ${location.country} se eliminó correctamente!`,
                })
                closeModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    text: `Primero debe eliminar las provincias y ciudades asociadas al país`,
                })
            }
        })
        .catch(e => console.log(e))
    }


    return <div className="genericModal">
            <form className="countryModalBody" onSubmit={(e) => deleteCountry(e)}>
                <p>Ingrese el país que desea Eliminar:</p>
                <select defaultValue={"-Seleccione un país-"} type="text" name="country" onChange={(evt) => onSelect(evt)}>
                    <option disabled>-Seleccione un país-</option>
                    {database ? database.map(x => <option key={x.id_country} data-key={x.id_country}>{x.country}</option>) : null}
                </select>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="DltBtn" type="submit">Eliminar</button>
                </div>
            </form>
    </div>  
}