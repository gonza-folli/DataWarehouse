import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const CompaniesData = ({renderData}) => {

    // const {handleCheck, viewContact, delContact} = useContext(SearchContext) //uso del Context para almacenar usuarios TILDADOS



    const dltCompany = () => {
        let response = fetch('./companies', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(renderData)
        })
        response.then(response => response.json()).then(data => console.log(data))
    }

    return <>
    <tr>
        {/* <td><input type="checkbox" className="selectContact" onChange={(evt) => handleCheck(renderData,evt)}/></td> */}
        <td>{renderData.name}</td>
        <td>{renderData.country}</td>
        <td>{renderData.city}</td>
        <td>{renderData.address}</td>
        <td>{renderData.phone}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={dltCompany}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}