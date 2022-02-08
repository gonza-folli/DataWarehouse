import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const CompaniesData = ({renderData, renderCleanCompanies, editCompanyData}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const dltCompany = async (company) => {
        await Swal.fire({
            text: `Está seguro que desea eliminar la companía ${company}`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                let response = fetch('./companies', {
                    method: "DELETE",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(renderData)
                })
                response.then(response => response.json()).then(data => {
                    Swal.fire({
                    icon: 'success',
                    text: `${company} se ha eliminado correctamente`,
                    })
                renderCleanCompanies()
                })
            }
        })
    }


    return <>
    <tr>
        <td>{renderData.name}</td>
        <td>{renderData.country}</td>
        <td>{renderData.city}</td>
        <td>{renderData.address}</td>
        <td>{renderData.phone}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => dltCompany(renderData.name)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen} onClick={() => editCompanyData(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}