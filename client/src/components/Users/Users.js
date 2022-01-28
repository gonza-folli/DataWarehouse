import './Users.css'

export const Users = () => {

    const saveState = () => {

    }
    
    
    return <section className="usersSection">
    <h1 className="title">Usuarios</h1>
        <form onSubmit={(e) => saveState(e)}>
            <div className="formDataContainer"> 
                <label> Nombre </label>
                    <input type="text" name="firstname"/>
                <label> Apellido </label>
                    <input type="text" name="middlename"/>
                <label> Email </label>
                    <input type="text" name="middlename"/>
                <label> Perfil</label>  
                    <select>
                        <option value="">-Seleccione un perfil-</option>  
                        <option value="user">Usuario</option>  
                        <option value="admin">Admin</option>   
                    </select>     
                <label> Contraseña </label>
                <input type="Password" id="pass" name="pass"/>     
                <label> Repetir Contraseña </label> 
                <input type="Password" id="repass" name="repass"/>  
                <button className="saveBtn" type="submit">Guardar</button>
            </div>
        </form>
    </section>
}