import { useEffect, useState } from "react";
import CollapseButton from "../components/buttons/model-button";
import './payments.css';
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { object } from "prop-types";
const Payments = () => {
    const [data, setData] = useState([]); // datos de la api
    const [dataDate, setDataDate] = useState('');
    const [errorMessage, setError] = useState('');
    const [showError, setShowError] = useState(false); // Estado para manejar la visibilidad del error
    const [checkboxState, setCheckboxState] = useState({});
    // const [changesDetected, setChangesDetected] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const handleDateChange = (event) => {
        setDataDate(event.target.value);
    };

    const updatePayment = async (payments) => {
        console.log("Datos de pagos a actualizar: ", payments);

        try {
            const response = await fetch(`http://localhost:8000/api/payment/updatePayment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payments
                }),

            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('result', result)
            if (result) {
                console.log("Pagos actualizados correctamente", result);
                setInitialData(payments);
            } else {
                console.error("Respuesta inesperada del servidor", result);
            }
        } catch (err) {
            console.error("Error al actualizar los pagos: ", err);
        }
    };

    const fetchData = async (fecha) => {
        try {
            const response = await fetch(`http://localhost:8000/api/payment/getPayments/${fecha}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("This is from FetchData Methodo Get : ", result);

            setData(result.data);

            const initialCheckboxState = result.data.reduce((acc, payment) => {
                acc[payment.Id] = payment.Cancelado !== "No";
                return acc;
            }, {});
            setCheckboxState(initialCheckboxState);

            // console.log('First useEffect: ',initialCheckboxState);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching data:", err);
        }
    };

    // Ejecutar cuando cambia la fecha
    useEffect(() => {
        if (dataDate) {
            fetchData(dataDate);
        }
    }, [dataDate]);

    useEffect(() => {
        // console.log('This is from sec UseEffect1: ',data)
        // console.log('This is from sec UseEffect2 :',checkboxState);
        if (data) {
            const finalInformacion = data
                .map(({ Id, IdGp }) => ({ id: Id, rifa: IdGp }))
                .map(data => ({
                    ...data,
                    status: checkboxState[data.id] !== undefined ? checkboxState[data.id] : undefined
                }));
            // console.log(finalInformacion)
            setInitialData(finalInformacion);
        }
    }, [data]);

    // useEffect(()=>{

    // },[initialData]);


    // const handleConsultButtonClick = async () => {
    //     if (dataDate) {
    //         console.log('This is Date', dataDate);
    //         console.log(checkboxState);
    //         fetchData(dataDate); // Llama a la API con la fecha seleccionada
    //         setErrorMessage('Data Filtrada Correctamente!   ');
    //         setShowError(true);
    //         handleInformation();

    //     } else {
    //         setErrorMessage('Por favor, selecciona una fecha.');
    //         setShowError(true);
    //     }
    // };

    const handleCheckboxChange = async (id) => {
        // console.log(checkboxState)
        console.log("Checkbox cambiado para ID:", id);
        setCheckboxState((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Cambia el estado del checkbock
        }));

    };


    const handleChanges = () => {
        console.log('Infor: ', initialData);
        console.log('Info initualdata in HandleChnages', checkboxState);
        const hasChanges = initialData.some((item) => {
            console.log('estatus        CheckboxStatus');
            console.log(item.status, checkboxState[item.id])

            const status = item.status !== checkboxState[item.id];
            return status;
        });
        return hasChanges;
    };


    const saveData = async () => {
        // console.log('This is from sec SAVEdata :',initialData);
        // console.log('This is from sec savedata :',checkboxState);
        const changes = handleChanges();
        console.log('Estatus desde saveData:', changes);

        if (!changes) {
            console.log('No changes detected');
            return;
        }
        const finalyData = initialData;
        console.log(finalyData);
        const finalInformacion = finalyData
            .map(data => ({
                ...data,
                id: data.id.toString(),  // Convertimos el id a cadena
                rifa: data.rifa.toString(),  // Convertimos rifa a cadena
                status: checkboxState[data.id] !== undefined
                    ? checkboxState[data.id]   // Si es true, asigna 1, si es false, asigna 0
                    : undefined
            }));

        console.log(finalInformacion);
        // console.log(finalInformacion)
        // setInitialData(finalInformacion);
        try {
            await updatePayment(finalInformacion);
        } catch (err) {
            console.error('Error al actualizar los pagos:', err);
        }
    }

    let totalCancelados = data.reduce((acc, p) => {
        return p.Cancelado === "Si" ? acc + Number(p.Monto) : acc;
    }, 0);

    let totalNoCancelados = data.reduce((acc, p) => {
        return p.Cancelado === "No" ? acc + Number(p.Monto) : acc;
    }, 0);
    let totalPagos = data.reduce((acc, p) => acc + Number(p.Monto), 0);
    const formatCurrency = (value) =>
        new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(value);


    return (
        <div>
            <h1>REGISTRO DE PAGOS</h1>
            {showError && <ErrorMessage message={errorMessage} />}
            <input
                type="date"
                value={dataDate}
                min="2025-02-01"
                max="2026-02-15"
                onChange={handleDateChange}
            />
            {/* <button onClick={handleConsultButtonClick} className="btn-edit">Consultar</button> */}
            <button type="submit" onClick={saveData}>GUARDAR</button>
            <table className='style-table'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rifa</th>
                        <th>Monto</th>
                        <th>Cancelado</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.Participante}</td>
                                <td>{payment.Rifa}</td>
                                <td>{payment.Monto}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checkboxState[payment.Id] || false}
                                        name={`checkbox-${index}`}
                                        id={`checkbox${payment.Id}`}
                                        onChange={() => handleCheckboxChange(payment.Id)}
                                    />
                                </td>
                            </tr>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay pagos para la fecha seleccionada.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <br />

            <table className='style-table'>
                <thead>
                    <tr>
                        <th>Monto Total</th>
                        <th>Acumulado</th>
                        <th>Pendiente</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalPagos}</td>
                        <td>{totalCancelados}</td>
                        <td>{totalNoCancelados}</td>
                    </tr>

                </tbody>

            </table>
        </div>
    );
}

export default Payments;