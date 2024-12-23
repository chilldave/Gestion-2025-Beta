import './modalbase.css';
import PropTypes from 'prop-types';


const Modal = ({ children, isOpen, onClose, className = "" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={`modal-container ${className}`}>
                <button className="modal-close-btn" onClick={onClose}>
                    &times; {/* Este es el botón "X" */}
                </button>
                {children} {/* Aquí puedes añadir cualquier contenido dinámico */}
            </div>
        </div>

    )
}


Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default Modal;