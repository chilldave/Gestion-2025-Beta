import React from 'react';
import './errorMessage.css';  // Asegúrate de tener un archivo CSS para los estilos

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      {message}
    </div>
  );
};

export default ErrorMessage;
