import { useContext, useState } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import { ProgressBar } from '../ProgressBar/ProgressBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import './ContactData.css'

export const ContactData = ({renderData, openEditModal}) => {

    const {handleCheck, delContact} = useContext(SearchContext) //uso del Context para almacenar usuarios TILDADOS

    const [rowStyle, setRowStyle] = useState(null)

    const handleStyle = (evt) => {
        if (evt.target.checked) {
        setRowStyle({background: "rgb(207,238,240)"})
        } else {
            setRowStyle(null)
        }
    }


    return <>
    <tr style={rowStyle}>
        <td><input type="checkbox" className="selectContact" onChange={(evt) => {handleCheck(renderData,evt);handleStyle(evt)}}/></td>
        <td className="td2">
            <div className="profilePhotoDiv"><img className="profilePhoto" src={renderData.profile_photo} alt="profilePhoto"/></div>
            <div className="profileData">
                <div className="profileName">{renderData.name} {renderData.lastname}</div>
                <div className="profileEmail">{renderData.email}</div>
            </div>
        </td>
        <td>
            <div className="profileLocation">
                <div className="profileCountry">{renderData.country}</div>
                <div className="profileRegion">{renderData.region}</div>
            </div>
        </td>
        <td>{renderData.company_name}</td>
        <td>{renderData.position}</td>
        {/* <td>{renderData.channels.map(x => <div key={x.name}>{x.name} - </div> )}</td> */}
        <td className="td7">
            <div className="interestTd">
                <div>{renderData.interest}%</div>
                <ProgressBar done={renderData.interest}/>
            </div>
        </td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => delContact(renderData)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen} onClick={() => openEditModal(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}