import { useEffect, useState, useContext } from "react"
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const EditCompanyModal = ({closeModal, renderData, companiesDatabase}) => {

    const [company, setCompany] = useState({
        id_company: renderData.id_company,
        name: renderData.name,
        phone: renderData.phone,
        id_city: renderData.id_city,
        country: renderData.country,
        state: renderData.state,
        city: renderData.city,
        address: renderData.address
    })

    const {getAvailableCities} = useContext(LocationContext)

    const [citiesDatabase, setCitiesDatabase] = useState()

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
            parseInt(x.phone) === parseInt(company.name) &&
            parseInt(x.id_city) === parseInt(company.id_city)
            )
        if (findDuplicate) {
            await Swal.fire({
                text: `La compañia ${company.name} ya existe en ese domicilio`,
                icon: 'error',
            })
        } else {
            await fetch('/companies', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(company)
            })
            .then(response => response.json()).then(response => 
                Swal.fire({
                text: `La compañia ${company.name} fue modificada correctamente`,
                icon: 'success',
            }))
            .catch(e => console.log(e))
            closeModal()
        }
    }


    return <div className="countryModal">
            <form className="cityModalBody" onSubmit={(e) => saveCity(e)}>
                <h1>Ingrese los nuevos datos a modificar</h1>
                <p>Nombre de la Companía</p>
                <input type="text" name="name" value={company.name} onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Número de Teléfono de la Companía</p>
                <input type="text" name="phone" value={company.phone} onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Domicilios disponibles</p>
                <select defaultValue={`${company.country}, ${company.state}, ${company.city}, ${company.address}`} onChange={(evt) => onSelectCity(evt)} type="text" name="id_city" required>
                    <option disabled>{company.country}, {company.state}, {company.city}, {company.address}</option>
                    {citiesDatabase ? citiesDatabase.map(x => <option key={x.id_city} data-key={x.id_city}>{x.country}, {x.state}, {x.city}, {x.address}</option>) : null}
                </select>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  

}