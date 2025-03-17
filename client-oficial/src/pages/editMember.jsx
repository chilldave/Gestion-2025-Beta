import './editMember.css';
import './members.css';
import Modal from '../components/modal/modalbase.jsx';
import { useEffect, useState } from "react";

const EditMember = () => {

    const [data, setData] = useState([]); // datos de la api
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados o buscados
    const [error, setError] = useState(null); // Error al buscar

    const [estadoModal1, setEstadoModal2] = useState(false);

    const [modalType, setModalType] = useState(""); // "create , edit" o "delete"

    const [selectedMemberId, setSelectedMemberId] = useState(null); // Para almacenar el id del miembro seleccionado
    const [selectedMemberName, setSelectedMemberName] = useState(null);


    const openModal = (type, member) => {

        setModalType(type);
        console.log('edit: ', member.id_persona)

        if (type === "edit") {
            setSelectedMemberId(member.id_persona); // Usamos el id del miembro
            setSelectedMemberName(member.nombre || ""); // Pre-poblar el nombre
        }
        if (type === "delete") {
            setSelectedMemberId(member.id_persona); // Usamos el id del miembro
            console.log("Miembro seleccionado para eliminar:", member.id_persona);
        }
        setEstadoModal2(true);
    }

    const closeModal = () => {
        console.log("Cerrando la modal...");
        setEstadoModal2(false);
        setModalType("");
    }

    const handleCreateMember = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        console.log(nombre);

        try {
            const response = await fetch(`http://localhost:8000/api/members/create-member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre
                }),

            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result && result.member) {
                const newMember = result.member;
                setData((prevData) => [...prevData, newMember]); // Actualiza la lista de miembros
                setFilteredData((prevData) => [...prevData, newMember]); // Actualiza la lista filtrada
                closeModal(); // Cierra la modal
            } else {
                console.error("Respuesta inesperada del servidor", result);
            }
        } catch (err) {
            console.error("Error guardando el registro:", err);
        }
    };
    const handleUpdateMember = async (e) => {
        e.preventDefault();

        const nombre = e.target.nombre.value;
    
        try {
            const response = await fetch(`http://localhost:8000/api/members/seekMember/${selectedMemberId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre, 
                }),
            });
    
            if (!response.ok) {
                console.log(response);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log(': result : ', result.data);
            if (result && result.data) {
                setData((prevData) =>
                    prevData.map((member) =>
                        member.id_persona === selectedMemberId ? result.data : member
                    )
                );
                setFilteredData((prevData) =>
                    prevData.map((member) =>
                        member.id_persona === selectedMemberId ? result.data : member
                    )
                );
                closeModal();
            } else {
                console.error("Respuesta inesperada del servidor", result);
            }
        } catch (err) {
            console.error("Error actualizando el registro:", err);
        }
    };

    const handleDeleteMember = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/members/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting member: ${response.statusText}`);
            }

            const result = await response.json();
            if (result.success) {
                setData((prevData) => prevData.filter((member) => member.id_persona !== id)); // Elimina de la lista
                setFilteredData((prevData) => prevData.filter((member) => member.id_persona !== id)); // Elimina de la lista filtrada
                closeModal(); // Cierra la modal
            } else {
                console.error('Error en la eliminación:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/members", {
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
                setFilteredData(result.data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (e) => {
        const inputValue = e.target.value;
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
            const result = await response.json();
            setFilteredData(result.data);
            setError(null);
        } catch (err) {
            setFilteredData([]);
            setError(`No se encontró un miembro con ID ${inputValue}`);
            console.error("Error fetching data:", err);
        }
    }



    return (
        <div>
            {/* <button onClick={openModal}>Abrir Modal</button> */}
            <Modal isOpen={estadoModal1} onClose={closeModal} className={modalType}>
                {modalType === "create" || modalType === "edit" ? (
                    <>
                    <h2>{modalType === "create" ? "Crear Integrante" : "Modificar Integrante"}</h2>
                    <form onSubmit={modalType === "create" ? handleCreateMember : handleUpdateMember}>
                      <input
                        type="text"
                        name="nombre"
                        placeholder={modalType === "create" ? "Nuevo nombre" : "Modificar nombre"}
                        defaultValue={modalType === "edit" ? selectedMemberName : ""}
                        required
                      />
                      <button type="submit" >
                        {modalType === "create" ? "Guardar" : "Actualizar"}
                      </button>
                    </form>
                  </>
                  
                ) : modalType === "delete" ? (
                    <>
                        <h2>Eliminar Registro</h2>
                        <p>¿Estás seguro que desea eliminar este registro?</p>
                        <button className="confirm-delete" onClick={() => handleDeleteMember(selectedMemberId)}>Aceptar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </>
                ) : false}
            </Modal>
            {/* visuals */}
            <div className="block-SearchBard">
                <button onClick={() => openModal("create")}>Crear Integrante</button>
            </div>

            <table className="miembros-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th colSpan="2" >ACCIONES</th>
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
                            < tr key={user.id_persona} className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{user.id_persona}</td>
                                <td>{user.nombre}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => openModal("edit", user)}>Modificar</button>
                                </td>
                                <td>
                                    <button className="btn-delete" onClick={() => openModal('delete', user)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>
                                No se encontraron resultados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    );
};

export default EditMember;

