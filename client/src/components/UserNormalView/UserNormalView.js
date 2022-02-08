import { useState } from "react"
import Swal from "sweetalert2"

export const UserNormalView = ({logUser, setAuth, setLogUser}) => {

    //Obtener Token
    const token = localStorage.getItem('token')


    const [user, setUser] = useState({
        id_user: logUser.id_user,
        name: logUser.name,
        lastname: logUser.lastname,
        email: logUser.email,
        rol: "user",
        pass: "",
        repass: ""
    })

    const handleUserChange = (evt) => {
        setUser({...user, [evt.target.name]: evt.target.value})
    }

    //funcion EDITAR CONTACTO
    async function changeUser (e) {
        e.preventDefault()
        if (user.pass === user.repass && user.pass !== "") {
                await fetch('/users', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error === false) {
                    Swal.fire({
                        icon: 'success',
                        text: `${data.message}`,
                    })
                    setAuth(false)
                    setLogUser(null)
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


    return <form className="genericModalBody" onSubmit={(e) => changeUser(e)}>
        <div className="regUserForm">
            <p> Nombre </p>
                <input type="text" name="name" value={logUser.name} onChange={(evt) =>handleUserChange(evt)} required/>
            <p> Apellido </p>
                <input type="text" name="lastname" value={logUser.lastname} onChange={(evt) =>handleUserChange(evt)} required/>
            <p> Email </p>
                <input type="text" name="email" value={logUser.email} onChange={(evt) =>handleUserChange(evt)} required disabled/>
            <p> Perfil </p>
                <select name="rol" onChange={(evt) =>handleUserChange(evt)} required disabled>
                    <option>{logUser.rol}</option>
                </select>
            <p> Contraseña </p>
                <input type="Password" name="pass" value={logUser.pass} onChange={(evt) =>handleUserChange(evt)} required/>     
            <p> Repetir Contraseña </p> 
                <input type="Password" name="repass" value={logUser.repass} onChange={(evt) =>handleUserChange(evt)} required/>
        </div>
        <div className="genericModalActions">
            <button className="saveBtn" type="submit">Guardar</button>
        </div>
    </form>
}