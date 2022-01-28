import { Link } from 'react-router-dom'
import './Header.css'

export const Header = () => {
    return <header className="App-header">
        <h1 className="logo">LOGO</h1>
        <div className="NavBarDiv">
            <ul className="NavBar">
                <li className="NavBarItem"><Link to="/contacts" className="NavBarLink">Contactos</Link></li>
                <li className="NavBarItem"><Link to="/companies" className="NavBarLink">Compañías</Link></li>
                <li className="NavBarItem"><Link to="/users" className="NavBarLink">Usuarios</Link></li>
                <li className="NavBarItem"><Link to="/location" className="NavBarLink">Región/Ciudad</Link></li>
            </ul>
        </div>
    </header>
}