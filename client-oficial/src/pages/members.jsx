// import { table } from "console";
import { useEffect, useState } from "react";
import './members.css';

const Members = () => {
    const [data, setData] = useState([]); // datos de la api
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados o buscados
    const [searchId, setSearchId] = useState(""); // Valor del input de búsqueda
    const [error, setError] = useState(null); // Error al buscar


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/dashboard/members", {
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
                setFilteredData(result.data);
                // console.log(result);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);
    // console.log('Data infor: ', data);

    const handleSearch = async (e) => {
        const inputValue = e.target.value;
        setSearchId(inputValue);
        console.log(setFilteredData);
        console.log(setError);
        if (inputValue.trim() === "") {
            setFilteredData(data);
            setError(null);
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/dashboard/members/${inputValue}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // console.log(response.json());
            const result = await response.json();
            // console.log(result);
            setFilteredData(result.data);
            // console.log(filteredData);
            setError(null);
            console.log(result);
        } catch (err) {
            setFilteredData([]);
            setError(`No se encontró un miembro con ID ${inputValue}`);
            console.error("Error fetching data:", err);
        }
    }


    return (
        <div>
            <h1>Integrantes Cuchubal 2025-2026</h1>

            <div className="block-SearchBard">
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={handleSearch} // Llamar a la función cada vez que cambie el texto
                    className="search-bar"
                />
            </div>

            <table className="miembros-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {error ? (
                        <tr>
                            <td colSpan="2" style={{ color: "red", textAlign: "center" }}>
                                {error}
                            </td>
                        </tr>
                    ) : filteredData.length > 0 ? (
                        filteredData.map((user, index) => (
                            <tr key={user.id_persona} className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{index + 1}</td>
                                <td>{user.nombre}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


// import React, { useState } from "react";



export default Members;