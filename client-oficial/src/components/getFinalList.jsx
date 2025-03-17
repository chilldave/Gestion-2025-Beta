import './getFinalList.css';
import PropTypes from 'prop-types'; // Asegúrate de usar "PropTypes" con "s" al final
// import { error, setError } from 'react';
import { useEffect, useState } from "react";





const GetFinalList = () => {
    const [data, setData] = useState([]); // datos de la api
    // const [filteredData, setFilteredData] = useState([]); // Datos filtrados o buscados
    // const [searchId, setSearchId] = useState(""); // Valor del input de búsqueda
    // const [error, setError] = useState(null); // Error al buscar


    useEffect(() => {
        const fetchDataList = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/draws/final", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                // console.log(typeof (response));
                // console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.data);
                // setFilteredData(result.data);
                // console.log(result);
            } catch (err) {
                // setError(err.message);
                console.error("Error fetching data:", err);
            }
        };

        fetchDataList();
    }, []);

    return (
        <div className='style-getFinalList'>
            <h2>Lista Final de Participantes</h2>
            <div className='style-table-getFinalList'>
                <table className='style-table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Fecha de la Rifa</th>
                            <th>Año</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((info, index) => (
                                <tr key={info.id_grupo} className={index % 2 === 0 ? "even" : "odd"}>
                                    <td>{info.id_grupo}</td>
                                    <td>{info.nombre}</td>
                                    <td>{info.fecha_rifa}</td>
                                    <td>{info.anho}</td>
                                    <td style={{ color: info.estado === 'Asignado' ? '#EBC58D' : '#8054EB' }}>{info.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No hay datos disponibles</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

GetFinalList.propTypes = {
    information: PropTypes.arrayOf(
        PropTypes.shape({
            id_grupo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            nombre: PropTypes.string.isRequired,
            fecha_rifa: PropTypes.string.isRequired,
            anho: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            estado: PropTypes.string.isRequired,
        })
    ).isRequired,
};


export default GetFinalList;