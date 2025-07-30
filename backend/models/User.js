const mongoose = require('mongoose');

// Define el esquema para el modelo de usuario
const userSchema = new mongoose.Schema({
  firebaseUid: { // ID único proporcionado por Firebase para este usuario
    type: String,
    required: true,
    unique: true, // Asegura que no haya UIDs duplicados
  },
  email: { // Correo electrónico del usuario
    type: String,
    required: true,
    unique: true, // Asegura que no haya correos duplicados
    lowercase: true, // Guarda el correo en minúsculas
    trim: true, // Elimina espacios en blanco al inicio y final
  },
  createdAt: { // Fecha de creación del usuario
    type: Date,
    default: Date.now, // Establece la fecha actual por defecto
  },
  // Puedes añadir más campos aquí según tus necesidades, por ejemplo:
  // name: { type: String, trim: true },
  // role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
});

// Crea el modelo a partir del esquema
const User = mongoose.model('User', userSchema);

module.exports = User; // Exporta el modelo para usarlo en otras partes del backend
