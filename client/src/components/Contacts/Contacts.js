import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ContactsTableHeader } from '../ContactsTableHeader/ContactsTableHeader'
import { SearchMenu } from '../SearchMenu/SearchMenu'
import { SearchButton } from '../SearchButton/SearchButton'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import { Filters } from '../Filters/Filters'
import { ExportMenu } from '../ExportMenu/ExportMenu'
import { AddContactModal } from '../Modals/ContactModals/AddContactModal'
import { ImportContactModal } from '../Modals/ContactModals/ImportContactModal'
import { DeleteContactModal } from '../Modals/ContactModals/DeleteContactModal'
import { EditContactModal } from '../Modals/ContactModals/EditContactModal'
import './Contacts.css'


export const Contacts = () => {

    //para desplegar el buscador por categoria
    const [displaySearchWindow, setDisplaySearchWindow] = useState(false)
    const searchWindow = () => setDisplaySearchWindow(!displaySearchWindow)

    const {getContacts, dataFiltered, clearSearch, searchData, allContacts, storeContactData, displayEditContact, displayDelSingleContact, deleteSingleContact} = useContext(SearchContext)

    //Estado para renderizar los contactos
    const [renderData, setRenderData] = useState(null)


//____________BUSCADOR POR NOMBRE______________________________________________________________________________________________________________________
    const [searchTerm, setSearchTerm] = useState(""); //para filtrar por nombre sólamente

    //seteo la busqueda por nombre solamente
    useEffect(() => {
        if (searchTerm !== "") {
            getContacts()
            .then(response => {
            let filtrado = response.filter(e => {
                return (e.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || e.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
            })
            setRenderData(filtrado)
            })
        // } else {
        //     getContacts().then(response => setRenderData(response))
        }
    }, [searchTerm, getContacts, allContacts])
//__________________________________________________________________________________________________________________________________________________

    //seteo para renderizar los contactos filtrados o completos
    useEffect(() => {
        if (dataFiltered) {
            setRenderData(dataFiltered)
        } else {
            getContacts().then(data => {
                console.log(data.response)
                setRenderData(data.response)
            })
        }        
    }, [dataFiltered,getContacts])

    //para desplegar el Modal Agregar Contacto
    const [displayAddContact, setDisplayAddContact] = useState(false)
    const addContact = () => setDisplayAddContact(!displayAddContact)

    //para desplegar el menu Exportar Contacto
    const [displayExpContact, setDisplayExpContact] = useState(false)
    // const exportContact = () => setDisplayExpContact(!displayExpContact)

    //para desplegar el modal Importar Contacto
    const [displayImpContact, setDisplayImpContact] = useState(false)
    const importContact = () => setDisplayImpContact(!displayImpContact)

    //para desplegar el modal Eliminar Contacto
    const [displayDltContact, setDisplayDltContact] = useState(false)
    const deleteContact = () => setDisplayDltContact(!displayDltContact)


    return <section className="contactsSection">
    <h1 className="title">Contactos</h1>
    <div className="ContactsFunctions">
        <div className="SearchPanel"> 
            <input className='SearchInput' onChange={(event)=> setSearchTerm(event.target.value)}></input>
            <button className='DownBtn' onClick={() => {searchWindow(); clearSearch()}}><FontAwesomeIcon className='DownIcon' icon={faCaretDown} /></button>
            <SearchButton displaySearchWindow={displaySearchWindow} searchWindow={searchWindow}/>
        </div>
        <div className="ContactsPanel"> 
            <button className='ImportBtn' onClick={() => setDisplayImpContact(!displayImpContact)} ><FontAwesomeIcon className='ImportIcon' icon={faUpload} /></button>
            <button className='ExportBtn' onClick={() => setDisplayExpContact(!displayExpContact)}>Exportar Contactos</button>
            <button className='AddBtn' onClick={() => setDisplayAddContact(!displayAddContact)}>Agregar Contacto</button>
        </div>
    </div>
    {displaySearchWindow ? <SearchMenu /> : null}
    {displayExpContact ? <ExportMenu /> : null}
    {searchData ? <Filters /> : null}
    {storeContactData.length > 0 ? 
        <div className="selectedContainer">
            <div className="selectedQuantity">
                {storeContactData.length} Seleccionado/s
            </div>
            <div className="deleteBtn" onClick={() => setDisplayDltContact(!displayDltContact)}>
                <FontAwesomeIcon className="trashIcon" icon={faTrash}></FontAwesomeIcon>
                <h4>Eliminar contactos</h4>
            </div>
        </div> 
    : null}
    <ContactsTableHeader renderData={renderData}/>
    {displayAddContact ? <AddContactModal closeModal={addContact}/> : null}
    {displayEditContact ? <EditContactModal/>: null}
    {displayImpContact ? <ImportContactModal closeModal={importContact}/> : null}
    {displayDltContact ? <DeleteContactModal closeModal={deleteContact}/> : null}
    {displayDelSingleContact ? <DeleteContactModal closeModal={deleteSingleContact}/> : null}
    
    </section>
}

