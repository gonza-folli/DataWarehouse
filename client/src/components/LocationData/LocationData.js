import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { LocationContext } from '../Context/LocationProvider/LocationProvider'


export const LocationData = ({renderData}) => {
    
    const {delLocation} = useContext(LocationContext)

    return <>
    <tr>
        <td><input type="checkbox" className="selectContact"/></td>
        <td>{renderData.region}</td>
        <td>{renderData.country}</td>
        <td>{renderData.state}</td>
        <td>{renderData.city}</td>
        <td>{renderData.address}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={()=> delLocation(renderData)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}