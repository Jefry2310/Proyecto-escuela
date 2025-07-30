require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); // Importa el modelo de usuario que acabas de crear

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,      // Estas opciones son deprecadas en versiones recientes de Mongoose
    // useUnifiedTopology: true,   // Puedes eliminarlas para evitar warnings
})
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    // process.exit(1); // Considera descomentar esto si la conexión a la DB es crítica
});

// --- Basic Route (for testing if the server is running) ---
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// --- NUEVA RUTA: Registrar usuario en MongoDB después de Firebase ---
app.post('/api/register-user', async (req, res) => {
  const { firebaseUid, email } = req.body; // Esperamos recibir el UID de Firebase y el email

  // Validación básica
  if (!firebaseUid || !email) {
    return res.status(400).json({ message: 'Firebase UID y email son requeridos.' });
  }

  try {
    // Intenta encontrar si el usuario ya existe por su firebaseUid
    let user = await User.findOne({ firebaseUid });

    if (user) {
      // Si el usuario ya existe, esto podría ser un reintento o un inicio de sesión
      // Podrías actualizar sus datos o simplemente confirmarle que ya existe
      console.log(`Usuario con Firebase UID ${firebaseUid} ya existe en MongoDB.`);
      return res.status(200).json({ message: 'Usuario ya registrado en MongoDB.', user });
    }

    // Si el usuario no existe, crea uno nuevo
    user = new User({
      firebaseUid,
      email,
    });

    await user.save(); // Guarda el nuevo usuario en MongoDB
    console.log(`Usuario ${email} registrado en MongoDB con UID: ${firebaseUid}`);
    res.status(201).json({ message: 'Usuario registrado exitosamente en MongoDB.', user });

  } catch (error) {
    console.error('Error al registrar usuario en MongoDB:', error);
    // Manejo de errores, por ejemplo, si el email ya existe (debido a unique: true)
    if (error.code === 11000) { // Código de error para duplicados en MongoDB
      return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al registrar usuario.' });
  }
});

// --- Start the server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
