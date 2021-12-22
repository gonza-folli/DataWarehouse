import { createContext, useEffect, useState } from "react";
import contacts from '../../contacts.json'

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {

    const [dataFiltered, setDataFiltered] = useState(null) // Estado para setear los contactos (completos o filtrados)

    //FETCH general
    const getContacts = async function () {
        let response = await contacts
        return response
    }

    //setear todos los contactos
    const allContacts = () => {
        getContacts().then(response => setDataFiltered(response))
    }    

    //setear todos los contactos filtrados
    const renderResults = () => {
        getContacts().then(response => {
            const filtered = response.filter(x => 
                (!searchData.name ||  x.name.toLowerCase().indexOf(searchData.name.toLowerCase()) !== -1) && 
                (!searchData.charge ||  x.charge.toLowerCase().indexOf(searchData.charge.toLowerCase()) !== -1) && 
                (!searchData.country || x.country === searchData.country) && 
                (!searchData.company || x.company === searchData.company) &&
                (!searchData.channel || x.channel === searchData.channel) &&
                (!searchData.interest || x.interest === searchData.interest))
            setDataFiltered(filtered)
        })
    }

//____________________________________________________________________________________________________________
    //Aplicar Filtros de Búsqueda en el menú
    const [searchData, setSearchData] = useState() //seteo los filtros a aplicar en la búsqueda
    const filterChange = (event) => {
        setSearchData(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    //Limpiar TODOS los Filtros de Búsqueda en el menú
    const clearSearch = () => {
        setSearchData(null)
    }

    //Limpiar UN Filtro de Búsqueda en el menú
    const clearFilter = (filter) => {
        let obj = searchData
        let {[filter]: _, ...result } = obj
        setSearchData(result)
    }
//____________________________________________________________________________________________________________

    //Creo un estado para almacenar los usuarios TILDADOS
    const [storeContactData, setStoreContactData] = useState([])

    const handleCheck = (contact,evt) => {
        if (evt.target.checked) {
        const contactToAdd = [...storeContactData, contact]
        setStoreContactData(contactToAdd)
        } else {
            const contactToRemove = storeContactData.filter(x => x.id !== contact.id)
            setStoreContactData(contactToRemove)
        }
    }
//____________________________________________________________________________________________________________

    //para desplegar el Modal Editar Contacto
    const [displayEditContact, setDisplayEditContact] = useState(false)
    const editContact = () => setDisplayEditContact(!displayEditContact)

    const [editContactData, setEditContactData] = useState()


    const viewContact = (renderData) => {
        editContact()
        setEditContactData(renderData)
    }

    //para desplegar el Modal Eliminar 1 sólo Contacto
    const [displayDelSingleContact, setDisplayDelSingleContact] = useState(false)
    const deleteSingleContact = () => setDisplayDelSingleContact(!displayDelSingleContact)

    const [delContactData, setDelContactData] = useState()

    const delContact = (renderData) => {
        deleteSingleContact()
        setDelContactData(renderData)
    }


//____________________________________________________________________________________________________________
    useEffect(()=> {
            if (searchData) {
                getContacts().then(response => {
                    const filtered = response.filter(x => 
                        (!searchData.name ||  x.name.toLowerCase().indexOf(searchData.name.toLowerCase()) !== -1) && 
                        (!searchData.charge ||  x.charge.toLowerCase().indexOf(searchData.charge.toLowerCase()) !== -1) && 
                        (!searchData.country || x.country === searchData.country) && 
                        (!searchData.company || x.company === searchData.company) &&
                        (!searchData.channel || x.channel === searchData.channel) &&
                        (!searchData.interest || x.interest === searchData.interest))
                    setDataFiltered(filtered)
                })
            }
    }, [searchData])

    return <SearchContext.Provider value={{getContacts, searchData, filterChange, renderResults, 
            dataFiltered, clearSearch, allContacts, clearFilter, handleCheck, storeContactData, 
            viewContact, displayEditContact, editContactData, editContact, 
            delContact, displayDelSingleContact, delContactData, deleteSingleContact}}>
        {children}
    </SearchContext.Provider>
}