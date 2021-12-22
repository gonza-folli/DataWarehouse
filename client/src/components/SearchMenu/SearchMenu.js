import './SearchMenu.css'
import contacts from '../contacts.json'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'


export const SearchMenu = () => {

    const {filterChange} = useContext(SearchContext)

    const [filters , setFilters] = useState(null)

// SETEAR LAS OPCIONES DE LAS LISTAS DE BUSQUEDAS POR CATEGORIAS
    useEffect(()=> {
        const getFilter = async function () {
            let response = await contacts
            return response
        }

        getFilter().then(response => setFilters(response))
    },[])


    return <>
    <div className="SearchMenu">
        <div className="name">
            <p>Nombre del Contacto</p> <input name="name" type="text" onChange={(event)=> filterChange(event)} placeholder="Introduce el nombre del contacto"></input>
        </div>
        <div className="charge">
            <p>Cargo</p> <input name="charge" type="text" onChange={(event)=> filterChange(event)} placeholder="Introduce el cargo del contacto"></input>
        </div>
        <div className="country">
            <p>País/Región</p>
            <select name="country" onChange={(event)=> filterChange(event)} >
                <option>Todos</option>
                {filters ? filters.map((data) => <option value={data.country} key={data.id}>{data.country}</option>) : null}
            </select>
        </div>
        <div className="company">
            <p>Compañía</p> 
            <select name="company" onChange={(event)=> filterChange(event)}>
                <option>Todas</option>
                {filters ? filters.map((data) => <option value={data.company} key={data.id}>{data.company}</option>) : null}
            </select>
        </div>
        <div className="channel">
            <p>Canal Favorito</p> 
            <select name="channel" onChange={(event)=> filterChange(event)}>
                <option>Cualquiera</option>
                {filters ? filters.map((data) => <option value={data.channel} key={data.id}>{data.channel}</option>) : null}
            </select>
        </div>
        <div className="interest">
            <p>Interes</p> 
            <select name="interest" onChange={(event)=> filterChange(event)}>
                <option>Cualquiera</option>
                {filters ? filters.map((data) => <option value={data.interest} key={data.id}>{data.interest}</option>) : null}
            </select>
            </div>
    </div>
    </>
    }