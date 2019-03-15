

// ====================

// PORT
// =====================
process.env.PORT = process.env.PORT || 3000;


// ====================

// ENTORNO
// =====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ====================
// database
// =====================
let urlDB;
urlDB = 'mongodb+srv://vafaster:M8qMljhEBOpUzrZo@cluster0-pyqmy.mongodb.net/cafe'

if(process.env.NODE_ENV === 'dev')
  urlDB = 'mongodb://localhost:27017/cafedb';
process.env.URLDB = urlDB;