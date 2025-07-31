import React, { useState } from 'react';
import { auth } from '../Firebase/firebaseConfig'; // Importa 'auth'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleSignIn = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      // alert('User signed in successfully!'); // Evita alerts, mejor redireccionar
      navigate('/dashboard'); // Redirige al dashboard después del inicio de sesión exitoso
    } catch (err) {
      setError(err.message);
      console.error("Sign in error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Iniciar Sesión</h2>
      <form onSubmit={handleSignIn} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Iniciar Sesión</button>
      </form>
      {error && <p style={styles.error}>Error: {error}</p>}
      <p style={styles.linkText}>
        ¿No tienes una cuenta? <Link to="/signup" style={styles.link}>Regístrate aquí</Link>
      </p>
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
    backgroundColor: '#f0f2f5',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    margin: '50px auto',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1.1em',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  error: {
    color: 'red',
    marginTop: '15px',
    textAlign: 'center',
  },
  linkText: {
    marginTop: '20px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default SignIn;
