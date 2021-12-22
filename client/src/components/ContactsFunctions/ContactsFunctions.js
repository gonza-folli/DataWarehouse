import './ContactsFunctions.css'
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


export const ContactsFunctions = () => {

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
            getContacts().then(response => setRenderData(response))
        }        
    }, [dataFiltered,getContacts])

    //para desplegar el Modal Agregar Contacto
    const [displayAddContact, setDisplayAddContact] = useState(false)
    const addContact = () => setDisplayAddContact(!displayAddContact)

    //para desplegar el menu Exportar Contacto
    const [displayExportContact, setDisplayExportContact] = useState(false)
    const exportContact = () => setDisplayExportContact(!displayExportContact)

    //para desplegar el modal Importar Contacto
    const [displayImportContact, setDisplayImportContact] = useState(false)
    const importContact = () => setDisplayImportContact(!displayImportContact)

    //para desplegar el modal Importar Contacto
    const [displayDeleteContact, setDisplayDeleteContact] = useState(false)
    const deleteContact = () => setDisplayDeleteContact(!displayDeleteContact)


    return <>
    <div className="ContactsFunctions">
        <div className="SearchPanel"> 
            <input className='SearchInput' onChange={(event)=> setSearchTerm(event.target.value)}></input>
            <button className='DownBtn' onClick={() => {searchWindow(); clearSearch()}}><FontAwesomeIcon className='DownIcon' icon={faCaretDown} /></button>
            <SearchButton displaySearchWindow={displaySearchWindow} searchWindow={searchWindow}/>
        </div>
        <div className="ContactsPanel"> 
            <button className='ImportBtn' onClick={importContact} ><FontAwesomeIcon className='ImportIcon' icon={faUpload} /></button>
            <button className='ExportBtn' onClick={exportContact}>Exportar Contactos</button>
            <button className='AddBtn' onClick={addContact}>Agregar Contacto</button>
        </div>
    </div>
    {displaySearchWindow ? <SearchMenu /> : null}
    {displayExportContact ? <ExportMenu /> : null}
    {searchData ? <Filters /> : null}
    {storeContactData.length > 0 ? <div className="selectedContainer">
            <div className="selectedQuantity">
                {storeContactData.length} Seleccionado/s
            </div>
            <div className="deleteBtn" onClick={deleteContact}>
                <FontAwesomeIcon className="trashIcon" icon={faTrash}></FontAwesomeIcon>
                <h4>Eliminar contactos</h4>
            </div>
        </div> : null}
    <ContactsTableHeader renderData={renderData}/>
    {displayAddContact ? <AddContactModal closeModal={setDisplayAddContact}/> : null}
    {displayEditContact ? <EditContactModal/>: null}
    {displayImportContact ? <ImportContactModal closeModal={setDisplayImportContact}/> : null}
    {displayDeleteContact ? <DeleteContactModal closeModal={setDisplayDeleteContact}/> : null}
    {displayDelSingleContact ? <DeleteContactModal closeModal={deleteSingleContact}/> : null}
    </>

}