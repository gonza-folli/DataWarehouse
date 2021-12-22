// import { ContactData } from "../ContactData/ContactData"
// import './ContactsTableHeader.css'

import { CompaniesData } from "../CompaniesData/CompaniesData"

export const CompaniesTableHeader = ({renderData}) => {

    return <>
    {renderData ?
        <table className="content-table">
            <thead>
                <tr>
                    {/* <th className='th1'><input type="checkbox" className="selectContact" id="selectContact" /></th> */}
                    <th className='th2'>Nombre</th>
                    <th className='th3'>País</th>
                    <th className='th4'>Ciudad</th>
                    <th className='th5'>Dirección</th>
                    <th className='th6'>Telefono</th>
                    <th className='th8'>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {renderData ? renderData.map((data)=> 
                <CompaniesData renderData={data} key={data.id_company}/>) : <tr className="loading"></tr>}
            </tbody>
        </table>
    : <div className="loadingFather"><div className="loading"></div></div> }
    </>
}