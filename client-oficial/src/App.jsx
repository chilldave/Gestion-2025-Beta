import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/sidebard';
import Members from './pages/members';
import { Dashboard } from './pages/dashboard';

const App = () => {
  return (
    <Router>
      <div style={appStyles}>
        {/* Barra lateral */}
        <Sidebar />

        {/* Contenido principal */}
        <div style={contentStyles}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/members" element={<Members />} />
            {/* <Route path="/page2" element={<Page2 />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

// Estilos para la estructura general
const appStyles = {
  display: 'flex',
};

const contentStyles = {
  marginLeft: '220px', // Asegura que el contenido no se sobreponga con el sidebar
  padding: '20px',
  flex: 1,
  overflowX: 'auto', // Para que el contenido no se salga de la pantalla si es muy ancho
};


export default App;