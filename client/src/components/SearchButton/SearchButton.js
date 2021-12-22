import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './SearchButton.css'
import { useContext } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'


export const SearchButton = ({displaySearchWindow, searchWindow}) => {

    const {renderResults, allContacts} = useContext(SearchContext)

    function render () {
        if (displaySearchWindow === true) {
            renderResults()
            searchWindow()
        } else {
            allContacts()
        }
    }

    return <button className='SearchBtn' onClick={() => render()}><FontAwesomeIcon className='SearchIcon' icon={faSearch} /></button>

}