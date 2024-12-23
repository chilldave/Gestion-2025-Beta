import './editMember.css';
import './members.css';
// import Members from './members';
import Modal from '../components/modal/modalbase.jsx';
// import Dropbox from '../components/dropbox/dropbox.jsx';
import { useEffect, useState } from "react";
import Dropbox from '../components/dropbox/dropbox.jsx';

const EditMember = () => {
    const [data, setData] = useState([]); // datos de la api
    const [filteredData, setFilteredData] = useState([]); // Datos filtrados o buscados
    const [searchId, setSearchId] = useState(""); // Valor del input de búsqueda
    const [error, setError] = useState(null); // Error al buscar
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(""); // "edit" o "delete"
    const [selectedMemberId, setSelectedMemberId] = useState(null); // Para almacenar el id del miembro seleccionado
    const [selectedMemberName, setSelectedMemberName] = useState(null);
    const [dropboxValue, setDropboxValue] = useState(""); // Estado para almacenar el valor del dropbox


    const openModal = (type, member) => {
        setModalType(type);

        if (type === "edit") {
            setSelectedMemberId(member.id_persona); // Usamos el id del miembro
            setSelectedMemberName(member.nombre || ""); // Pre-poblar el nombre
            console.log('This is member', member.id_persona);
            console.log('This is member', member.nombre);
            console.log('This is member', member);

        }
        if (type === "delete") {
            setSelectedMemberId(member.id_persona); // Usamos el id del miembro
            console.log("Miembro seleccionado para eliminar:", member.id_persona);
        }
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setModalType("");
        setIsModalOpen(false);
    }

    const handleSaveMember = async (e) => {
        e.preventDefault();
        console.log(e.target.nombre);
        const nombre = e.target.nombre.value;
        console.log('tHIS IS TARGET.NOMBRE', e.target);
        console.log('This is nombre', e.target.nombre);
        console.log('This is dropboxvalue ', dropboxValue);
        // const id_grupo = e.target.id_grupo.value;
        // const [dropboxValue, setDropboxValue] = useState(""); // Estado para almacenar el valor del dropbox
        try {
            const response = await fetch(`http://localhost:8000/dashboard/members/create-member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    id_date: dropboxValue,
                }),

            });
            console.log('This is front de POST METHOD', response.body);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Registro guardado:", result);

            // // Actualizar datos en la tabla
            // setData((prevData) => prevData.map((item) =>
            //     item.id === selectedMemberId ? { ...item, nombre } : item
            // ));
            // setFilteredData((prevData) => prevData.map((item) =>
            //     item.id === selectedMemberId ? { ...item, nombre } : item
            // ));
            // Agregar el nuevo miembro a los estados
            // const newMember = result.data;  // Asumiendo que la respuesta incluye el miembro recién creado

            // setData((prevData) => [...prevData, newMember]);
            // setFilteredData((prevData) => [...prevData, newMember]);
            if (result && result.data) {
                const newMember = result.data;  // Asegúrate de que esta propiedad existe en la respuesta

                setData((prevData) => [...prevData, newMember]);
                setFilteredData((prevData) => [...prevData, newMember]);

                closeModal(); // Cerrar modal
            } else {
                console.error("Respuesta inesperada del servidor", result);
            }
        } catch (err) {
            console.error("Error guardando el registro:", err);
        }
    };

    const handleDeleteMember = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/dashboard/members/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error deleting member: ${response.statusText}`);
            }

            const result = await response.json();
            console.log(result.message); // Mostrar el mensaje de éxito
            // Aquí puedes actualizar la lista de miembros o hacer cualquier otra cosa que necesites
            closeModal(); // Cerrar modal
        } catch (error) {
            console.error('Error:', error);
        }
    };
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

            {/* <button onClick={openModal}>Abrir Modal</button> */}
            <Modal isOpen={isModalOpen} onClose={closeModal} className={modalType}>
                {modalType === "create" || modalType === "edit" ? (
                    <>
                        <h2>{modalType === "create" ? "Crear Integrante" : "Modificar Integrante"}</h2>
                        <form onSubmit={modalType === "create" ? handleSaveMember : ""}>
                            <input
                                type="text"
                                name="nombre"
                                placeholder={modalType === "create" ? "Nuevo nombre" : "Modificar nombre"}
                                defaultValue={modalType === "edit" ? selectedMemberName : ""}
                                required
                            />
                            <Dropbox
                                value={dropboxValue} // Pasa el valor actual del dropdown
                                onChange={(value) => setDropboxValue(value)} // Actualiza el valor cuando cambie
                            />
                            <button type="submit">{modalType === "create" ? "Guardar" : "Actualizar"}</button>
                        </form>
                    </>
                ) : modalType === "delete" ? (
                    <>
                        <h2>Eliminar Registro</h2>
                        <p>¿Estás seguro de que deseas eliminar este registro?</p>
                        <button className="confirm-delete" onClick={() => handleDeleteMember(selectedMemberId)}>Aceptar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </>
                ) : null}
            </Modal>

            <div className="block-SearchBard">
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={searchId}
                    onChange={handleSearch} // Llamar a la función cada vez que cambie el texto
                    className="search-bar"
                />

                <button onClick={() => openModal("create")}>Crear Integrante</button>

            </div>

            <table className="miembros-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th colSpan="2" >Acciones</th>
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
                            < tr key={index + 1} className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{index + 1}</td>
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
                            <td colSpan="3" style={{ textAlign: "center" }}>
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