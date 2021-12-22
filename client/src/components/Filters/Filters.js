import { useContext } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import './Filters.css'

export const Filters = () => {
    
    const {searchData, clearFilter} = useContext(SearchContext)

    return <div className="filterContainer">
    {searchData.name ? <div><h4>{searchData.name}</h4><button onClick={()=> clearFilter("name")}>X</button></div> : null}
    {searchData.country ? <div><h4>{searchData.country}</h4><button onClick={()=> clearFilter("country")}>X</button></div> : null}
    {searchData.charge ? <div><h4>{searchData.charge}</h4><button onClick={()=> clearFilter("charge")}>X</button></div> : null}
    {searchData.company ? <div><h4>{searchData.company}</h4><button onClick={()=> clearFilter("company")}>X</button></div> : null}
    {searchData.channel ? <div><h4>{searchData.channel}</h4><button onClick={()=> clearFilter("channel")}>X</button></div> : null}
    {searchData.interest ? <div><h4>{searchData.interest}</h4><button onClick={()=> clearFilter("interest")}>X</button></div> : null}
    </div>
}