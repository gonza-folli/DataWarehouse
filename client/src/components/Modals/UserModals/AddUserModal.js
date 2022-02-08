import {useEffect, useState } from 'react'
import Swal from 'sweetalert2'


export const AddUserModal = ({closeModal, editData}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const [user, setUser] = useState({
        name: "",
        lastname: "",
        email: "",
        rol: "",
        pass: "",
        repass: ""
    })

    const handleUserChange = (evt) => {
        if(editData) {
            setNewUser({...newUser, [evt.target.name]: evt.target.value})
        } else {
            setUser({...user, [evt.target.name]: evt.target.value})
        }
    }


    async function saveUser (e) {
        e.preventDefault()
        if (user.pass === user.repass) {
            await fetch('/users/signup', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json()).then(data => {
                if (data.error === false) {
                    Swal.fire({
                    text: `${data.message}`,
                    icon: 'success',
                    })
                    closeModal()
                } else {
                    Swal.fire({
                    text: `${data.message}`,
                    icon: 'error',
                    })
                }
            })
            .catch(e => console.log(e))
        } else {
            await Swal.fire({
                text: `Las contraseñas no coinciden`,
                icon: 'error',
            })
        }
    }


    // ----------- Seccion editar usuario ------------------------------

    const [newUser, setNewUser] = useState({
        id_user: "",
        name: "",
        lastname: "",
        email: "",
        rol: "",
        pass: "",
        repass: ""
    })


    useEffect(() => {
        if (editData) {
            setNewUser({
                id_user: editData.id_user,
                name: editData.name,
                lastname: editData.lastname,
                email: editData.email,
                rol: editData.rol,
                pass: editData.password,
                repass: "",
            })
        }
    }, [editData])


    //funcion EDITAR CONTACTO
    async function changeUser (e) {
        e.preventDefault()
        if (newUser.pass === newUser.repass) {
                await fetch('/users', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newUser)
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
                }
            })
            .catch(e => console.log(e))
        } else {
            await Swal.fire({
                text: `Las contraseñas no coinciden`,
                icon: 'error',
            })
        }
    }

    return <div className="genericModal">
        {editData ? 
            <form className="genericModalBody" onSubmit={(e) => changeUser(e)}>
                <h1> Editar Cuenta </h1>
                <div className="regUserForm">
                    <p> Nombre </p>
                        <input type="text" name="name" value={newUser.name} onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Apellido </p>
                        <input type="text" name="lastname" value={newUser.lastname} onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Email </p>
                        <input type="text" name="email" value={newUser.email} onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Perfil </p>
                        <select name="rol" onChange={(evt) =>handleUserChange(evt)} required>
                            <option>{newUser.rol}</option>
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>
                    <p> Contraseña </p>
                        <input type="Password" name="pass" value={newUser.pass} onChange={(evt) =>handleUserChange(evt)} required/>     
                    <p> Repetir Contraseña </p> 
                        <input type="Password" name="repass" value={newUser.repass} onChange={(evt) =>handleUserChange(evt)} required/>
                </div>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
            :
            <form className="genericModalBody" onSubmit={(e) => saveUser(e)}>
                <h1> Crear Nuevo Usuario </h1>
                <div className="regUserForm">
                    <p> Nombre </p>
                        <input type="text" name="name" onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Apellido </p>
                        <input type="text" name="lastname" onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Email </p>
                        <input type="text" name="email" onChange={(evt) =>handleUserChange(evt)} required/>
                    <p> Perfil </p>  
                        <select name="rol" onChange={(evt) =>handleUserChange(evt)} required>
                            <option value="">-Seleccione un perfil-</option>  
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>     
                    <p> Contraseña </p>
                    <input type="Password" name="pass" onChange={(evt) =>handleUserChange(evt)} required/>     
                    <p> Repetir Contraseña </p> 
                    <input type="Password" name="repass" onChange={(evt) =>handleUserChange(evt)} required/>
                </div>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>}
        </div>
    }