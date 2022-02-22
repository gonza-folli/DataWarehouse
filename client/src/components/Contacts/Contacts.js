import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ContactsTableHeader } from '../ContactsTableHeader/ContactsTableHeader'
import { SearchMenu } from '../SearchMenu/SearchMenu'
import { SearchButton } from '../SearchButton/SearchButton'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import { Filters } from '../Filters/Filters'
import { ExportMenu } from '../ExportMenu/ExportMenu'
import { AddContactModal } from '../Modals/ContactModals/AddContactModal'
import { ImportContactModal } from '../Modals/ContactModals/ImportContactModal'
import { DeleteContactModal } from '../Modals/ContactModals/DeleteContactModal'
import './Contacts.css'


export const Contacts = () => {

    const {getContacts, searchData, storeContactData, displayDelSingleContact, setDelContactData, setDisplayDelSingleContact} = useContext(SearchContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    //Estado para renderizar los contactos
    const [renderData, setRenderData] = useState(null)

    //Estado para manejar internamente la DB y evitar hacer muchas consultas en SQL
    const [contactDatabase, setContactDatabase] = useState(null)

    //Estado para editar contacto
    const [contactEditData, setContactEditData] = useState(null)

    //seteo INICIAL para fetchear TODOS los contactos
    useEffect(() => {
        const response = fetch('/contacts', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        response.then(data => data.json()).then(data => {
            setRenderData(data.response) //manejar estado de renderizado
            setContactDatabase(data.response) //manejar array internamente con todos los datos de contactos ya fetcheados
        })
    }, [token])

    //Estado para renderizar opciones elegidas del buscador
    const [filters, setFilters] = useState(null)

    //Estado para desplegar el BUSCADOR AVANZADO
    const [displaySearchWindow, setDisplaySearchWindow] = useState(false)
    const searchWindow = () =>  { //se activa del boton buscar y se pasa por props el seteo de contactos para renderizar
        setDisplaySearchWindow(!displaySearchWindow)
        setFilters(searchData)
        setRenderData(dataFiltered)
    }

    //Estado para traer el resultado del BUSCADOR AVANZADO
    const [dataFiltered, setDataFiltered] = useState()

    //seteo para renderizar los contactos filtrados(BUSCADOR AVANZADO) o completos
    useEffect(()=> {
        // console.log(storeContactData)
            if (filters) {
                const filtered = contactDatabase.filter(x => 
                    (!filters.name ||  x.name.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1 || x.lastname.toLowerCase().indexOf(filters.name.toLowerCase()) !== -1) && 
                    (!filters.position ||  x.position.toLowerCase().indexOf(filters.position.toLowerCase()) !== -1) && 
                    (!filters.country || x.country === filters.country) && 
                    (!filters.company_name || x.company_name === filters.company_name) &&
                    (!filters.channels || x.channels.map(x => x.name).toString() === filters.channels) &&
                    (!parseInt(filters.interest) || x.interest === parseInt(filters.interest)))
                setRenderData(filtered)
                }
    }, [contactDatabase, filters])


//____________BUSCADOR SIMPLE POR NOMBRE/APELLIDO/COMPANIA/PAIS___________________________________________________________________________
    const [searchTerm, setSearchTerm] = useState(""); //para filtrar por nombre sólamente

    useEffect(() => {
        if (searchTerm !== "" ) {
            let filtrado = contactDatabase.filter(x => {
                return (x.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                x.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                x.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                x.country.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })
            setRenderData(filtrado)
        } else if (!searchData){
            setRenderData(contactDatabase)
        }
    }, [searchTerm, contactDatabase, searchData])
//___________________________________________________________________________________________________________________________________________

    //para desplegar el Modal Agregar Contacto
    const [displayAddContact, setDisplayAddContact] = useState(false)
    const addContact = () => {
        setDisplayAddContact(!displayAddContact)
        getContacts().then(data => {
            setRenderData(data.response)
            setContactDatabase(data.response)
        })
        setContactEditData(null)
    }

    //para desplegar el menu Exportar Contacto
    const [displayExpContact, setDisplayExpContact] = useState(false)
    // const exportContact = () => setDisplayExpContact(!displayExpContact)

    //para desplegar el modal Importar Contacto
    const [displayImpContact, setDisplayImpContact] = useState(false)
    const importContact = () => setDisplayImpContact(!displayImpContact)

    //para desplegar el modal Eliminar Contacto
    const [displayDltContact, setDisplayDltContact] = useState(false)
    const deleteContact = () => {
        setDelContactData(null)
        setDisplayDelSingleContact(false)
        setDisplayDltContact(false)
        getContacts().then(data => {
            setRenderData(data.response)
            setContactDatabase(data.response)
        })
    }

    //funcion editar contacto
    const openEditModal = (data) => {
        setDisplayAddContact(true)
        setContactEditData(data)
    }


    return <section className="contactsSection">
    <h1 className="title">Contactos</h1>
    <div className="ContactsFunctions">
        <div className="SearchPanel"> 
            <input className='SearchInput' placeholder="Ingrese NOMBRE o APELLIDO o COMPAÑÍA o PAÍS"onChange={(event)=> setSearchTerm(event.target.value)}></input>
            <button className='DownBtn' onClick={() => setDisplaySearchWindow(!displaySearchWindow)}><FontAwesomeIcon className='DownIcon' icon={faCaretDown} /></button>
            <SearchButton displaySearchWindow={displaySearchWindow} searchWindow={searchWindow}/>
        </div>
        <div className="ContactsPanel"> 
            <button className='ImportBtn' onClick={() => setDisplayImpContact(!displayImpContact)} ><FontAwesomeIcon className='ImportIcon' icon={faUpload} /></button>
            <button className='ExportBtn' onClick={() => setDisplayExpContact(!displayExpContact)}>Exportar Contactos</button>
            <button className='AddBtn' onClick={() => setDisplayAddContact(!displayAddContact)}>Agregar Contacto</button>
        </div>
    </div>
    {displaySearchWindow ? <SearchMenu contactDatabase={contactDatabase} setDataFiltered={setDataFiltered}/> : null}
    {displayExpContact ? <ExportMenu /> : null}
    {filters ? <Filters filters={filters} setFilters={setFilters}/> : null}
    {storeContactData.length > 0 ? 
        <div className="selectedContainer">
            <div className="selectedQuantity">
                {storeContactData.length} Seleccionado/s
            </div>
            <div className="trashBtn" onClick={() => setDisplayDltContact(!displayDltContact)}>
                <FontAwesomeIcon className="trashIcon" icon={faTrash}></FontAwesomeIcon>
                <h4>Eliminar contactos</h4>
            </div>
        </div> 
    : null}
    <ContactsTableHeader renderData={renderData} openEditModal={openEditModal}/>
    {displayAddContact ? <AddContactModal closeModal={addContact} editData={contactEditData}/> : null}
    {displayImpContact ? <ImportContactModal closeModal={importContact}/> : null}
    {displayDltContact ? <DeleteContactModal closeModal={deleteContact}/> : null}
    {displayDelSingleContact ? <DeleteContactModal closeModal={deleteContact}/> : null}
    
    </section>
}

