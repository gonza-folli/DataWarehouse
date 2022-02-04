import { useEffect, useState } from "react"
import { AddUserModal } from "../Modals/UserModals/AddUserModal"
import { UsersTableHeader } from "../UsersTableHeader/UsersTableHeader"


export const Users = () => {

    const [renderData, setRenderData] = useState()

    const getUsers = () => {
        let response = fetch('/users')
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }

    //Estado para editar usuario
    const [userEditData, setUserEditData] = useState(null)

    useEffect(() => {
        getUsers()
    }, [])


    //para desplegar el Modal Agregar usuario
    const [displayAddUser, setDisplayAddUser] = useState(false)
    const addUser = () => {
        setDisplayAddUser(!displayAddUser)
        setUserEditData(null)
        setRenderData()
        getUsers()
    }

    //funcion eliminar usuario
    const renderCleanUsers = () => {
        setRenderData()
        getUsers()
    }

    //funcion editar usuario
    const openEditModal = (data) => {
        setDisplayAddUser(true)
        setUserEditData(data)
    }


    return <section className="usersSection">
    <h1 className="title">Usuarios</h1>
    <div className="CompaniesFunctions">
        <button className='AddBtn' onClick={() =>setDisplayAddUser(!displayAddUser)}>Agregar Usuario</button>
    </div>
    {displayAddUser ? <AddUserModal closeModal={addUser} editData={userEditData}/> : null}
    <UsersTableHeader renderData={renderData} renderCleanUsers={renderCleanUsers} openEditModal={openEditModal}/>

    </section>
}