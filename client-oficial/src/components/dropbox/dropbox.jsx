import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Dropbox = ({ value, onChange }) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    console.log(value);
    console.log(onChange);

    useEffect(() => {

        const fetchDataAvailable = async () => {

            try {
                const response = await fetch("http://localhost:8000/dashboard/draws/available", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            }
        };

        fetchDataAvailable();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)} // Llama a `onChange` con el valor seleccionado
            >
                <option value="" disabled>
                    Select your option
                </option>
                <option value="n">None</option>
                {data.map((info, index) => (
                    <option key={index} value={info.Id}>
                        {info.Disponibles}
                    </option>
                ))}
            </select>
        </div>
    );
};

Dropbox.propTypes = {
    value: PropTypes.string.isRequired, // Valor actual del dropdown
    onChange: PropTypes.func.isRequired, // Función para manejar cambios
};

export default Dropbox;
