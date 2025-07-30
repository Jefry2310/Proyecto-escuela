import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Importa el objeto 'auth' de tu configuración de Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Importa tus componentes de página
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SingnIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const [loading, setLoading] = useState(true); // Estado para saber si Firebase está cargando

  // Escucha los cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Actualiza el estado del usuario
      setLoading(false); // La carga ha terminado
    });

    // Función de limpieza para desuscribirse cuando el componente se desmonte
    return () => unsubscribe();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  // Componente de Ruta Protegida
  // Redirige a la página de inicio de sesión si el usuario no está autenticado
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando autenticación...</div>;
    }
    if (!user) {
      return <Navigate to="/signin" replace />; // Redirige a la página de inicio de sesión
    }
    return children; // Muestra el componente hijo (Dashboard) si el usuario está autenticado
  };

  return (
    <Router>
      <div className="App" style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
        <Routes>
          {/* Ruta para la página de inicio (Landing Page) */}
          <Route path="/" element={<LandingPage />} />

          {/* Rutas para Iniciar Sesión y Registrarse */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Ruta protegida para el Dashboard */}
          {/* Solo se puede acceder si el usuario está autenticado */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Ruta de fallback para cualquier otra URL no definida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
