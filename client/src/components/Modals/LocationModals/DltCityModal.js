import {useEffect} from 'react'

export const DltCityModal = ({database, closeModal}) => {


    useEffect( ()=> {
        console.log(database)
    }, [database])


    function deleteState (e) {
        e.preventDefault()
        fetch('/location/city', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(database)
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
                <h1>Desea eliminar la ciudad {database.city}</h1>
                <h1>Domicilio {database.address}</h1>
                <div className="countryModalActions">
                    <button className="cancelBtn" type="button">Cancelar</button>
                    <button className="DltBtn" type="submit">Eliminar</button>
                </div>
            </form>
    </div>  
}