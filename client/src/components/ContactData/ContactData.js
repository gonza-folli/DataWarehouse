import { useContext } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import './ContactData.css'

export const ContactData = ({renderData}) => {

    const {handleCheck, viewContact, delContact} = useContext(SearchContext) //uso del Context para almacenar usuarios TILDADOS

    return <>
    <tr>
        <td><input type="checkbox" className="selectContact" onChange={(evt) => handleCheck(renderData,evt)}/></td>
        <td className="td2">
            <div className="profilePhotoDiv"><img className="profilePhoto" src={renderData.image} alt="profilePhoto"/></div>
            <div className="profileData">
                <div className="profileName">{renderData.firstname} {renderData.lastname}</div>
                <div className="profileEmail">{renderData.email}</div>
            </div>
        </td>
        <td>
            <div className="profileLocation">
                <div className="profileCountry">{renderData.country}</div>
                <div className="profileRegion">{renderData.region}</div>
            </div>
        </td>
        <td>{renderData.company}</td>
        <td>{renderData.charge}</td>
        <td>{renderData.channel}</td>
        <td className="td7"><div className="interestTd">
            <div>{renderData.interest}%</div>
            <ProgressBar done={renderData.interest}/>
            </div>
        </td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => delContact(renderData)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen} onClick={() => viewContact(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}