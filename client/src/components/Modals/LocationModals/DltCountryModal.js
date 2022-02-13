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
        if (location.id_country !== '') {
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
                text: `Debe seleccionar un país para eliminar`,
            })
        }
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