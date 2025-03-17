// import { Routes, Route } from 'react-router-dom';

import Module from "../components/module";
import "./memberrouter.css";


const MemberRoute = () => {
    const moduleNames = [
        { name: "Administrar Integrantes", path: "/dashboard/members/option/manage-members" },
        { name: "Listado de Integrantes", path: "/dashboard/members/option/list-members" },
        { name: "Bitacora de Pagos", path: "/dashboard/members/option/bitacora-pagos" },
        { name: "Módulo 4", path: "module4" },
        { name: "Módulo 5", path: "module5" }];
    return (
        <div className="container-own-moduleroute">
            <h1>Member Settings </h1>
            <div className="container-module">
                {moduleNames.map((moduleName, index) => (
                    // <Link to={moduleName.path} key={index}>
                    <Module path={moduleName.path} key={index} name={moduleName.name} />
                    // </Link>
                ))}
            </div>
        </div >
    );
}

export default MemberRoute;