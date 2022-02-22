import {useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCompanyModal = ({closeModal, companiesDatabase}) => {

    const {getAvailableCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [citiesDatabase, setCitiesDatabase] = useState()

    const [company, setCompany] = useState({
        name: "",
        phone: "",
        id_city: "",
    })

    useEffect(() => {
        getAvailableCities().then(data => setCitiesDatabase(data.response))
    }, [getAvailableCities])


    function onSelectCity (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_city = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setCompany({...company, id_city})
    }


    async function saveCity (e) {
        e.preventDefault()
        let findDuplicate = companiesDatabase.find( x => 
            x.name.toLowerCase() === company.name.toLowerCase() &&
            parseInt(x.id_city) === parseInt(company.id_city)
            )
        if (findDuplicate) {
            await Swal.fire({
                text: `La compañia ${company.name} ya existe en ese domicilio`,
                icon: 'error',
            })
        } else {
            await fetch('/companies', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(company)
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
        }
    }


    return <div className="genericModal">
            <form className="genericModalBody" onSubmit={(e) => saveCity(e)}>
                <p>Ingrese el Nombre de la Companía</p>
                <input type="text" name="name" onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Ingrese el Número de Teléfono de la Companía</p>
                <input type="text" name="phone" onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Domicilios disponibles</p>
                <select defaultValue={"-Seleccione un domicilio-"} type="text" name="id_city" onChange={(evt) => onSelectCity(evt)}required>
                    <option disabled>-Seleccione un domicilio-</option>
                    {citiesDatabase ? citiesDatabase.map(x => <option key={x.id_city} data-key={x.id_city}>{x.country}, {x.state}, {x.city}, {x.address}</option>) : null}
                </select>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  

}