
import React, { useState } from "react";
import './modal-button.css';

const CollapseButton = ({ nombre, children })=>{

    const [isOpen, setIsOpen] = React.useState(false);

    return(
        <div className="button-container">
            <button onClick={()=>setIsOpen(!isOpen)} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg">

            {nombre}
            </button>
            {isOpen && (
                <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                    {children}
                </div>
            )}
        </div>
    );
}

export default CollapseButton;