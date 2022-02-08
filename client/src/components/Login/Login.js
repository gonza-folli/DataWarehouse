import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Login.css'

export const Login = ({setAuth, setLogUser}) => {

    const [renderForm, setRenderForm] = useState(true) //Estado para limpiar el formulario

    //Para redireccionar tras logeo exitoso
    const [redirect, setRedirect] = useState(false)

//Para crear nueva cuenta
    const [newUser, setNewUser] = useState()

    const handleUserChange = (evt) => {
        setNewUser({...newUser, [evt.target.name]: evt.target.value})
    }

//Para logear un usuario
    const [loginData, setLoginData] = useState()

    const handleLoginChange = (evt) => {
        setLoginData({...loginData, [evt.target.name]: evt.target.value})
    }


    async function saveUser (e) {
        e.preventDefault()
        if (newUser.pass === newUser.repass) {
            await fetch('/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json()).then(data => {
                if (data.error === false) {
                    Swal.fire({
                    text: `${data.message}`,
                    icon: 'success',
                    })
                } else {
                    Swal.fire({
                    text: `${data.message}`,
                    icon: 'error',
                    })
                }
            })
            .catch(e => console.log(e))
            setRenderForm(false) //Estado para limpiar el formulario
            setRenderForm(true) //Estado para limpiar el formulario
        } else {
            await Swal.fire({
                text: `Las contraseñas no coinciden`,
                icon: 'error',
            })
        }
    }

    async function login (e) {
        e.preventDefault()
        await fetch('/users/login', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData)
        })
        .then(response => response.json()).then(data => {
            if (data.error === false) {
                Swal.fire({
                text: `${data.message}`,
                icon: 'success',
                })
                console.log(data)
                localStorage.setItem("token", data.response.key)
                setLogUser(data.response)
                setAuth(true)
                setRedirect(true)
            } else {
                Swal.fire({
                text: `${data.message}`,
                icon: 'error',
                })
            }
        })
    }

    return <section className="loginSection">
    <h1 className="title">Login</h1>
        <div className='loginBodyContainer'>
            {renderForm ? <>
            <form onSubmit={(e) => saveUser(e)}>
                <h1> Crear Nueva Cuenta </h1>
                <div className="regUserForm"> 
                    <p> Nombre </p>
                        <input type="text" name="name" onChange={(evt) =>handleUserChange(evt)}/>
                    <p> Apellido </p>
                        <input type="text" name="lastname" onChange={(evt) =>handleUserChange(evt)}/>
                    <p> Email </p>
                        <input type="text" name="email" onChange={(evt) =>handleUserChange(evt)}/>
                    <p> Perfil </p>  
                        <select name="rol" onChange={(evt) =>handleUserChange(evt)}>
                            <option value="">-Seleccione un perfil-</option>  
                            <option value="user">Usuario</option>
                            <option value="admin">Admin</option>
                        </select>     
                    <p> Contraseña </p>
                    <input type="Password" name="pass" onChange={(evt) =>handleUserChange(evt)}/>     
                    <p> Repetir Contraseña </p> 
                    <input type="Password" name="repass" onChange={(evt) =>handleUserChange(evt)}/>  
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
            <h1>Ó</h1>
            <form onSubmit={(e) => login(e)}>
                <h1> Iniciar Sesión </h1>
                <div className="loginUserForm"> 
                    <p> Ingrese usuario </p>
                        <input type="text" name="user" onChange={(evt) =>handleLoginChange(evt)}/>
                    <p> Ingrese su contraseña </p>
                        <input type="Password" name="pass" onChange={(evt) =>handleLoginChange(evt)}/>
                        <button className="saveBtn" type="submit">Iniciar Sesión</button>
                </div>
            </form>
            </> : <div className="loading"/>}
        </div>
        {redirect ? <Redirect push to={'/contacts'} /> : null}
    </section>
}