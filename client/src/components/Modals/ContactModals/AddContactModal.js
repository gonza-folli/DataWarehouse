import './AddContactModal.css'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar} from '../../ProgressBar/ProgressBar.js'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'


export const AddContactModal = ({closeModal, editData}) => {

    const {getAllSubregions, getCountriesFromSubreg, getCitiesFromCountry, getAddressFromCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [contactData, setContactData] = useState()
    
    //Seteo inicial de las subregiones, paises, ciudades y compañias
    const [regions , setRegions] = useState(null)
    const [countries, setCountries] = useState(null)
    const [cities, setCities] = useState(null)
    const [address, setAddress] = useState(null)
    const [companies, setCompanies] = useState(null)

    useEffect(() => {
        getAllSubregions().then(data => setRegions(data.response))
        fetch('/companies', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }},).then(response => response.json()).then(data => setCompanies(data.response))
    }, [getAllSubregions, token])

    // useEffect(() => {
    //     console.log(contactData)
    // }, [contactData])

    // useEffect(() => {
    //     console.log(editData)
    // }, [editData])

    //funcion para activar siguiente campo
    const [countryDisabled, setCountryDisabled] = useState(true)
    const [cityDisabled, setCityDisabled] = useState(true)
    const [addressDisabled, setAddressDisabled] = useState(true)

    const handleChange = (evt) => {
        setContactData({...contactData, [evt.target.name]: evt.target.value})
    }

    // Estado para la barrita de interes
    const [interestBar, setInterestBar] = useState(0)
    const handleInterestChange = (evt) => {
        setInterestBar(parseInt(evt.target.value))
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: parseInt(evt.target.value)})
        } else {
            setContactData({...contactData, [evt.target.name]: parseInt(evt.target.value)})
        }
    }

    //funciones selectores de COMPAÑÍA
    const handleCompanyChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_company = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) {
            setNewContact({...newContact, id_company, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_company, [evt.target.name]: evt.target.value})
        }
    }

    //variable FLAG para re-renderizar REGIONES en editar contacto
    const [clearOptions, setClearOptions] = useState(true)

    //funciones selectores de UBICACION
    const handleSubregChange = (evt) => {
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: evt.target.value})
            setClearOptions(false)
        } else {
            setContactData({...contactData, [evt.target.name]: evt.target.value})
        }
        const selectedIndex = evt.target.options.selectedIndex
        if (evt.target.options[selectedIndex].value === evt.target.options[0].value) {
            setCountryDisabled(true)
            setCityDisabled(true)
            setAddressDisabled(true)
        } else {
            setCountryDisabled(false)
            setCityDisabled(true)
            setAddressDisabled(true)
        }
        setCountries(null)
        setCities(null)
        setAddress(null)
        getCountriesFromSubreg(evt.target.value).then(data => setCountries(data.response))
    }

    const handleCountryChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_country = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) {
            setNewContact({...newContact, id_country, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_country, [evt.target.name]: evt.target.value})
        }
        if (evt.target.options[selectedIndex].value === evt.target.options[0].value) {
            setCityDisabled(true)
            setAddressDisabled(true)
        } else {  
            setCityDisabled(false)
            setAddressDisabled(true)
        }
        setCities(null)
        setAddress(null)
        getCitiesFromCountry(id_country).then(data => {
            data.response.length === 0 ? alert("El pais no tiene ciudades cargadas") : setCities(data.response)
        })
    }

    const handleCityChange = (evt) => {
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, [evt.target.name]: evt.target.value})
        }
        setAddressDisabled(false)
        setAddress(null)
        getAddressFromCities(evt.target.value).then(data => setAddress(data.response))
    }

    const handleAddressChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_city = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) { 
            setNewContact({...newContact, id_city, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_city, [evt.target.name]: evt.target.value})
        }
    }

    //funciones selectores de CANALES
    const channelOptions = [
        {name: "Whatsapp",
        userAccount: "whatsappUser",
        preferences: "whatsappPref"}, 
        {name: "Instagram",
        userAccount: "instagramUser",
        preferences: "instagramPref"}, 
        {name: "Twitter",
        userAccount: "twitterUser",
        preferences: "twitterPref"}, 
        {name: "Facebook",
        userAccount: "facebookUser",
        preferences: "facebookPref"}
    ]

    const [channelData, setChannelData] = useState({
        whatsappUser: "",
        instagramUser: "",
        twitterUser: "",
        facebookUser: "",
    })

    const [newChannelData, setNewChannelData] = useState()

    const handleChannelChange = (evt) => {
        if (editData) {
                setNewChannelData({...newChannelData, [evt.target.name]: evt.target.value})
        } else {
            setChannelData({...channelData, [evt.target.name]: evt.target.value})
        }
    }

    //funciones GUARDAR CONTACTO
    async function saveContact () {
        // e.preventDefault()
        let contactToAdd = {...contactData, channelData}
        await fetch('/contacts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(contactToAdd)
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
                // closeModal()
            }
        })
        .catch(e => console.log(e))
    }

// ----------- Seccion editar contact ------------------------------

    const [newContact, setNewContact] = useState({
        address: "",
        channels: "",
        city: "",
        company_name: "",
        country: "",
        email: "",
        id_city: "",
        id_company: "",
        id_contact: "",
        interest: "",
        lastname: "",
        name: "",
        position: "",
        profile_photo: "",
        state: "",
        subregion: ""
    })

    useEffect(() => {
        if (editData) {
            setNewContact({
                address: editData.address,
                channels: editData.channels,
                city: editData.city,
                company_name: editData.company_name,
                country: editData.country,
                email: editData.email,
                id_city: editData.id_city,
                id_company: editData.id_company,
                id_contact: editData.id_contact,
                interest: editData.interest,
                lastname: editData.lastname,
                name: editData.name,
                position: editData.position,
                profile_photo: editData.profile_photo,
                state: editData.state,
                subregion: editData.subregion
            })
            setInterestBar(editData.interest)
        }
    }, [editData])

    useEffect(() => {
        if (editData) {
            setNewChannelData({
                whatsappUser: editData.channels.filter(x => x.name === "Whatsapp").map(y => y.user_account).toString(),
                instagramUser: editData.channels.filter(x => x.name === "Instagram").map(y => y.user_account).toString(),
                twitterUser: editData.channels.filter(x => x.name === "Twitter").map(y => y.user_account).toString(),
                facebookUser: editData.channels.filter(x => x.name === "Facebook").map(y => y.user_account).toString(),
                whatsappPref: editData.channels.filter(x => x.name === "Whatsapp").map(y => y.preferences).toString(),
                instagramPref: editData.channels.filter(x => x.name === "Instagram").map(y => y.preferences).toString(),
                twitterPref: editData.channels.filter(x => x.name === "Twitter").map(y => y.preferences).toString(),
                facebookPref: editData.channels.filter(x => x.name === "Facebook").map(y => y.preferences).toString()
            })
        }
    }, [editData])

    // useEffect(() => {
    //     console.log(newContact)
    // }, [newContact])

    //funcion EDITAR CONTACTO
    async function changeContact () {
    // e.preventDefault()
    let contactToAdd = {...newContact, newChannelData}
    await fetch('/contacts', {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contactToAdd)
    })
    .then(response => response.json())
    .then(data => {
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
            // closeModal()
        }
    })
    .catch(e => console.log(e))
}


    return <div className="contactModal">
    <div className="modalHeader">
        {editData ? <h1>Editar Contacto</h1> : <h1>Nuevo Contacto</h1>}
        <button onClick={() =>closeModal()}>X</button>
        <div className="modalHeaderData">
            <div className="profilePhotoContainer">
                <div className="profilePhoto">
                    <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="profilePhoto"></img>
                </div>
                <div className="iconContainer"><FontAwesomeIcon className='faCamera' icon={faCamera} /></div>
            </div>
            {editData ? 
            <>
                <label>Nombre *<input value={newContact.name} type="text" name="name" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Apellido *<input value={newContact.lastname} type="text" name="lastname" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Cargo *<input value={newContact.position} type="text" name="position" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Email *<input value={newContact.email} type="text" name="email" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Compañía *
                    <select name="company_name" onChange={(evt) => handleCompanyChange(evt)}>
                        <option>{newContact.company_name}</option>
                        {companies ? companies.map((data) => <option value={data.name} key={data.id_company} data-key={data.id_company}>{data.name}</option>) : null}
                    </select>
                </label>
                </>
            : <>
                <label>Nombre *<input type="text" name="name" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Apellido *<input type="text" name="lastname" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Cargo *<input type="text" name="position" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Email *<input type="text" name="email" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Compañía *
                    <select name="company_name" onChange={(evt) => handleCompanyChange(evt)}>
                        <option>Seleccionar compañía</option>
                        {companies ? companies.map((data) => <option value={data.name} key={data.id_company} data-key={data.id_company}>{data.name}</option>) : null}
                    </select>
                </label>
            </>}
        </div>
    </div>
    <div className="modalBody">
        <div className="userData">
            {editData ? <>
            <div>
                <p>Región</p>
                <select name="subregion" onChange={(evt) => handleSubregChange(evt)}>
                    <option>{newContact.subregion}</option>
                    {regions ? regions.map((data) => <option value={data.subregion} key={data.subregion}>{data.subregion}</option>) : null}
                </select>
            </div>
            <div>
                <p>País</p>
                <select name="country" disabled={countryDisabled} onChange={(evt) => handleCountryChange(evt)}>
                    {clearOptions ? <option>{newContact.country}</option> : <option>Seleccionar país</option>}
                    {countries ? countries.map((data) => <option value={data.country} key={data.id_country} data-key={data.id_country}>{data.country}</option>) : null}
                </select>
            </div>
            <div>
                <p>Ciudad</p>
                <select name="city" disabled={cityDisabled} onChange={(evt) => handleCityChange(evt)}>
                    {clearOptions ? <option>{newContact.city}</option> : <option>Seleccionar Ciudad</option>}
                    {cities ? cities.map((data) => <option value={data.city} key={data.id_city}>{data.city}</option>) : null}
                </select>
            </div>
            <div>
                <p>Dirección</p>
                <select name="address" disabled={addressDisabled} onChange={(evt) => handleAddressChange(evt)}>
                    {clearOptions ? <option>{newContact.address}</option> : <option>Ingresa una dirección</option>}
                    {address ? address.map((data) => <option value={data.address} key={data.id_city} data-key={data.id_city}>{data.address}</option>) : null}
                </select>
            </div>
            <div>
                <p>Interes</p>
                <div className="interestContainer">
                    <ProgressBar done={interestBar}/>
                    <select className="interest" name="interest" onChange={(evt)=> handleInterestChange(evt)}>
                        <option>{newContact.interest}%</option>
                        <option>0%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                        <option>100%</option>
                    </select>
                </div>
            </div>
            </> 
            : <>
            <div>
                <p>Región</p>
                <select name="subregion" onChange={(evt) => handleSubregChange(evt)}>
                    <option>Seleccionar región</option>
                    {regions ? regions.map((data) => <option value={data.subregion} key={data.subregion}>{data.subregion}</option>) : null}
                </select>
            </div>
            <div>
                <p>País</p>
                <select name="country" disabled={countryDisabled} onChange={(evt) => handleCountryChange(evt)}>
                    <option>Seleccionar país</option>
                    {countries ? countries.map((data) => <option value={data.country} key={data.id_country} data-key={data.id_country}>{data.country}</option>) : null}
                </select>
            </div>
            <div>
                <p>Ciudad</p>
                <select name="city" disabled={cityDisabled} onChange={(evt) => handleCityChange(evt)}>
                    <option>Seleccionar ciudad</option>
                    {cities ? cities.map((data) => <option value={data.city} key={data.id_city}>{data.city}</option>) : null}
                </select>
            </div>
            <div>
                <p>Dirección</p>
                <select name="address" disabled={addressDisabled} onChange={(evt) => handleAddressChange(evt)}>
                    <option>Ingresa una dirección</option>
                    {address ? address.map((data) => <option value={data.address} key={data.id_city} data-key={data.id_city}>{data.address}</option>) : null}
                </select>
            </div>
            <div>
                <p>Interes</p>
                <div className="interestContainer">
                    <ProgressBar done={interestBar}/>
                    <select className="interest" name="interest" onChange={(evt)=> handleInterestChange(evt)}>
                        <option>0%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                        <option>100%</option>
                    </select>
                </div>
            </div>
            </>}
        </div>
        <div className="channelDataHeader"> 
            <p>Canal de Contacto</p>
            <p>Cuenta de Usuario</p>
            <p>Preferencias</p>
        </div>
        {channelOptions.map(x =>  
            <div key={x.name} className="channelData"> 
                <div>
                    <select name="channel" >
                        <option>{x.name}</option>
                    </select>
                </div>
                <label>
                    {!newChannelData ?
                    <input type="text" name={x.userAccount} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                    : null}
                    {newChannelData ?
                        x.userAccount === "whatsappUser" ? 
                            <input type="text" value={newChannelData.whatsappUser} key={x.userAccount} name={x.userAccount} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newChannelData ?
                        x.userAccount === "instagramUser" ? 
                            <input type="text" value={newChannelData.instagramUser} key={x.userAccount} name={x.userAccount} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newChannelData ?
                        x.userAccount === "twitterUser" ? 
                            <input type="text" value={newChannelData.twitterUser} key={x.userAccount} name={x.userAccount} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newChannelData ?
                        x.userAccount === "facebookUser" ? 
                            <input type="text" value={newChannelData.facebookUser} key={x.userAccount} name={x.userAccount} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    </label>
                <div>
                    {editData ?
                        editData.channels.find(y => (y.name === x.name)) ?
                            <select name={x.preferences} onChange={(evt) => handleChannelChange(evt)}>
                                <option>{editData.channels.filter(y => (y.name === x.name)).map(z => z.preferences)}</option>
                                <option>Sin preferencia</option>
                                <option>Canal Favorito</option>
                                <option>No Molestar</option>
                            </select>
                            : 
                            <select name={x.preferences} onChange={(evt) => handleChannelChange(evt)}>
                                <option>Sin preferencia</option>
                                <option>Canal Favorito</option>
                                <option>No Molestar</option>
                            </select>
                    :
                    <select name={x.preferences} onChange={(evt) => handleChannelChange(evt)}>
                        <option>Sin preferencia</option>
                        <option>Canal Favorito</option>
                        <option>No Molestar</option>
                    </select> }
                </div>
            </div>
        )}
    </div>
    <div className="modalFooter">
        <div className="modalActions">
            <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
            {editData ? 
            <button className="saveBtn" onClick={()=> changeContact()}>Guardar cambios</button> 
            : 
            <button className="saveBtn" onClick={()=> saveContact()}>Guardar contacto</button>}
        </div>
    </div>
    </div>
}