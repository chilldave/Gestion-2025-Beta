// import React from 'react';
import { Link } from 'react-router-dom';
import './sidebard.css';
import myLogo from '../assets/react.svg';
export const Sidebar = () => {
    return (
        <div className='sidebarStyles'>
            <h2><img src={myLogo} alt="Mypage" /></h2>
            <nav>
                <ul>
                    <li>
                        <Link to="/dashboard">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/members/options">Miembros</Link>
                    </li>
                    {/* Aquí puedes agregar más enlaces */}
                </ul>
            </nav>
        </div >
    )
}



export default Sidebar;