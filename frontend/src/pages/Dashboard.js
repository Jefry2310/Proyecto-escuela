import React from 'react';
import { auth } from '../firebaseConfig'; // Importa 'auth'
import { signOut } from 'firebase/auth'; // Importa signOut
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Dashboard() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirige a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión: " + error.message); // Usar un modal en una app real
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bienvenido al Dashboard</h1>
      <p style={styles.paragraph}>¡Has iniciado sesión correctamente!</p>
      <button onClick={handleSignOut} style={styles.button}>Cerrar Sesión</button>
      {/* Aquí irá el contenido real de tu dashboard */}
      <div style={styles.contentArea}>
        {/* Por ejemplo, enlaces a otras secciones, listas de estudiantes, etc. */}
        <p>Aquí puedes empezar a construir las funcionalidades de tu aplicación.</p>
        <ul>
          <li>Gestión de Estudiantes</li>
          <li>Gestión de Cursos</li>
          <li>Calificaciones</li>
          {/* ...y más */}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    backgroundColor: '#e9ecef',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '50px auto',
  },
  heading: {
    fontSize: '2.8em',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.3em',
    color: '#34495e',
    marginBottom: '30px',
    textAlign: 'center',
  },
  button: {
    padding: '12px 25px',
    fontSize: '1.1em',
    backgroundColor: '#dc3545', // Rojo para cerrar sesión
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '30px',
  },
  buttonHover: {
    backgroundColor: '#c82333',
  },
  contentArea: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    width: '100%',
    textAlign: 'left',
    color: '#444',
  },
};

export default Dashboard;
