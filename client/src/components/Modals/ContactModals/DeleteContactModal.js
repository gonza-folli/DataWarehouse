import DeleteImg from '../../assets/DeleteContact.png'
import './DeleteContactModal.css'

export const DeleteContactModal = ({closeModal}) => {
    return <div className="deleteModal">
            <div className="deleteModalBody">
                <img src={DeleteImg} alt="importImg"/>
                <p>¿Seguro que desea eliminar los contactos seleccionados?</p>
                <div className="deleteModalActions">
                    <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" >Eliminar</button>
                </div>
            </div>
    </div>  
}