import './AddContactModal.css'
import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../Context/SearchProvider/SearchProvider'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar} from '../../ProgressBar/ProgressBar.js'


export const AddContactModal = ({closeModal}) => {

    const {getContacts} = useContext(SearchContext)
    const [filters , setFilters] = useState(null)
    
    // SETEAR LAS OPCIONES DE LAS LISTAS DE BUSQUEDAS
        useEffect(()=> {
            getContacts().then(response => setFilters(response))
        }, [getContacts]);

    // Estado para la barrita de interes
    const [interestBar, setInterestBar] = useState(0)


    return <div className="contactModal">
                <div className="modalHeader">
                    <h1>Nuevo Contacto</h1>
                    <button onClick={() =>closeModal()}>X</button>
                    <div className="modalHeaderData">
                        <div className="profilePhotoContainer">
                            <div className="profilePhoto">
                                <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="profilePhoto"></img>
                            </div>
                            <div className="iconContainer"><FontAwesomeIcon className='faCamera' icon={faCamera} /></div>
                        </div>
                        <label>Nombre *<input type="text"></input></label>
                        <label>Apellido *<input type="text"></input></label>
                        <label>Cargo *<input type="text"></input></label>
                        <label>Email *<input type="text"></input></label>
                        <label>Compañía *<input type="text" placeholder="Ingresar nombre de la compañía"></input></label>
                    </div>
                </div>
                <div className="modalBody">
                    <div className="userData"> 
                        <div>
                            <p>Región</p>
                            <select name="region" >
                                <option>Seleccionar región</option>
                                {filters ? filters.map((data) => <option value={data.region} key={data.id}>{data.region}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>País</p>
                            <select name="country" disabled>
                                <option>Seleccionar país</option>
                                {filters ? filters.map((data) => <option value={data.country} key={data.id}>{data.country}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Ciudad</p>
                            <select name="city" disabled>
                                <option>Seleccionar ciudad</option>
                                {filters ? filters.map((data) => <option value={data.city} key={data.id}>{data.city}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Dirección</p>
                            <select name="address" disabled>
                                <option>Ingresa una dirección</option>
                                {filters ? filters.map((data) => <option value={data.address} key={data.id}>{data.address}</option>) : null}
                            </select>
                        </div>
                        <div>
                            <p>Interes</p>
                            <div className="interestContainer">
                                <ProgressBar done={interestBar}/>
                                <select className="interest" name="interest" onChange={(evt)=> setInterestBar(parseInt(evt.target.value))}>
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
                                <option>Seleccionar canal</option>
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
                        <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
                        <button className="saveBtn" >Guardar contacto</button>
                    </div>
                </div>
    </div>
}