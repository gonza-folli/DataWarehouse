import { useEffect, useState } from "react"
import { CompaniesTableHeader } from "../CompaniesTableHeader/CompaniesTableHeader"

export const Companies = () => {

    const [renderData, setRenderData] = useState()

    const getCompanies = () => {
        let response = fetch('/companies')
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }

    useEffect(() => {
        getCompanies()
    }, [])


    return <section className="companiesSection">
    <h1 className="title">Compañías</h1>
    <div className="CompaniesFunctions">
        <button className='AddBtn'>Agregar Compañia</button>
    </div>

    <CompaniesTableHeader renderData={renderData} />

    </section>
}