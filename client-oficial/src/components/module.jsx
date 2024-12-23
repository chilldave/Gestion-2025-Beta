import PropTypes from 'prop-types'; // Asegúrate de usar "PropTypes" con "s" al final.
import './module.css';
import { Link } from "react-router-dom";


const Module = ({ name, path }) => {
    return (
        <div className='style-module'>
            <p>{name}</p>
            <Link to={path} className='button-link-module'>
                <button>SELECIONAR</button>
            </Link>
        </div>
    );
};

// Validación de las props
Module.propTypes = {
    name: PropTypes.string.isRequired, // Cambia "btName" por "name" para que coincida
    path: PropTypes.string.isRequired,
};

// Valor predeterminado para el prop
Module.defaultProps = {
    name: "EXAMPLEEEEEE 10000", // También aquí debes usar "name"
};

export default Module;

