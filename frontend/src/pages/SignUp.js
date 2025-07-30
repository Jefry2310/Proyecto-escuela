import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      // 1. Registrar usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Obtiene el objeto de usuario de Firebase

      // 2. Enviar los datos del usuario al backend para guardar en MongoDB
      const backendResponse = await fetch('http://localhost:5000/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: user.uid, // UID de Firebase
          email: user.email,     // Email del usuario
        }),
      });

      const backendData = await backendResponse.json();

      if (!backendResponse.ok) {
        // Si el backend responde con un error (ej. email duplicado en MongoDB)
        throw new Error(backendData.message || 'Error al guardar usuario en MongoDB.');
      }

      console.log('Usuario registrado en Firebase y MongoDB:', backendData);
      // alert('Usuario registrado exitosamente!'); // Puedes quitar esto si prefieres una redirección suave
      navigate('/dashboard'); // Redirige al dashboard después de todo el proceso
      setEmail('');
      setPassword('');

    } catch (err) {
      setError(err.message);
      console.error("Error en el proceso de registro:", err);
      // Aquí podrías querer revertir la creación de Firebase si falla MongoDB,
      // pero eso añade complejidad y para empezar, no es estrictamente necesario.
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Registrarse</h2>
      <form onSubmit={handleSignUp} style={styles.form}>
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
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
      {error && <p style={styles.error}>Error: {error}</p>}
      <p style={styles.linkText}>
        ¿Ya tienes una cuenta? <Link to="/signin" style={styles.link}>Inicia sesión aquí</Link>
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
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
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

export default SignUp;
