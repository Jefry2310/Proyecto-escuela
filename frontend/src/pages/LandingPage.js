import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bienvenido a tu Proyecto</h1>
      <p style={styles.paragraph}>Una plataforma para gestionar tu escuela.</p>
      <div style={styles.buttonContainer}>
        <Link to="/signin" style={styles.button}>
          Iniciar Sesión
        </Link>
        <Link to="/signup" style={styles.button}>
          Registrarse
        </Link>
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
    minHeight: '80vh', // Ocupa casi toda la altura de la ventana
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '50px auto',
  },
  heading: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px', // Espacio entre los botones
  },
  button: {
    padding: '12px 25px',
    fontSize: '1.1em',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none', // Quita el subrayado del enlace
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default LandingPage;
