import './AddContactModal.css'
import { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar} from '../ProgressBar/ProgressBar.js'


export const EditContactModal = () => {

    const {getContacts, editContactData, editContact} = useContext(SearchContext)
    const [filters , setFilters] = useState(null)
    
    // SETEAR LAS OPCIONES DE LAS LISTAS DE BUSQUEDAS
        useEffect(()=> {
            getContacts().then(response => setFilters(response))
        }, [getContacts]);

    // Estado para la storear en un objeto todos los cambios del contacto
    const [newContactData, setnewContactData] =  useState(editContactData)

    const handleChange = (event) => {
        setnewContactData({...newContactData, [event.target.name]: event.target.value})
    }
    const handleInterest = (event) => {
        setnewContactData({...newContactData, [event.target.name]: parseInt(event.target.value)})
    }

    useEffect( () => {
        console.log(newContactData)
    }, [newContactData])


    return <div className="contactModal">
                <div className="modalHeader">
                    <h1>Editar Contacto</h1>
                    <button onClick={editContact}>X</button>
                    <div className="modalHeaderData">
                        <div className="profilePhotoContainer">
                            <div className="profilePhoto">
                                <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="profilePhoto"></img>
                            </div>
                            <div className="iconContainer"><FontAwesomeIcon className='faCamera' icon={faCamera} /></div>
                        </div>
                        <label>Nombre *<input name ="name" type="text" value={newContactData.firstname} onChange={(evt) => handleChange(evt)}></input></label>
                        <label>Apellido *<input name ="lastName" type="text" value={newContactData.lastname} onChange={(evt) => handleChange(evt)}></input></label>
                        <label>Cargo *<input name ="charge" type="text" value={newContactData.charge} onChange={(evt) => handleChange(evt)}></input></label>
                        <label>Email *<input name ="email" type="text" value={newContactData.email} onChange={(evt) => handleChange(evt)}></input></label>
                        <label>Compañía *<input name ="company" type="text" value={newContactData.company} onChange={(evt) => handleChange(evt)}></input></label>
                    </div>
                </div>
                <div className="modalBody">
                    <div className="userData"> 
                        <div>
                            <p>Región</p>
                            <select name="region" >
                                <option>{editContactData.region}</option>
                                {filters ? filters.map((data) => <option value={data.region} key={data.id}>{data.region}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>País</p>
                            <select name="country" disabled>
                                <option>{editContactData.country}</option>
                                {filters ? filters.map((data) => <option value={data.country} key={data.id}>{data.country}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Ciudad</p>
                            <select name="city" disabled>
                                <option>{editContactData.city}</option>
                                {filters ? filters.map((data) => <option value={data.city} key={data.id}>{data.city}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Dirección</p>
                            <select name="address" disabled>
                                <option>{editContactData.address}</option>
                                {filters ? filters.map((data) => <option value={data.address} key={data.id}>{data.address}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Interes</p>
                            <div className="interestContainer">
                                <ProgressBar done={newContactData.interest}/>
                                <select className="interest" name="interest" onChange={(evt)=> handleInterest(evt)}>
                                    <option>{editContactData.interest}%</option>
                                    <option>0%</option>
                                    <option>25%</option>
                                    <option>50%</option>
                                    <option>75%</option>
                                    <option>100%</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="channelData"> 
                        <div>
                            <p>Canal de Contacto</p>
                            <select name="channel" >
                                <option>{editContactData.channel}</option>
                                {filters ? filters.map((data) => <option value={data.channel} key={data.id}>{data.channel}</option>) : null}
                            </select>
                        </div>
                        <label>Cuenta de Usuario<input type="text" placeholder="@ejemplo" disabled></input></label>
                        <div>
                            <p>Preferencias</p>
                            <select name="preferences" disabled>
                                <option>Sin preferencia</option>
                                {filters ? filters.map((data) => <option value={data.channel} key={data.id}>{data.channel}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <button className="addChn" disabled> + Agregar Canal</button>
                        </div>
                    </div>
                </div>
                <div className="modalFooter">
                    <div className="modalActions">
                        <button className="cancelBtn" onClick={editContact}>Cancelar</button>
                        <button className="saveBtn" >Guardar contacto</button>
                    </div>
                </div>
    </div>
}