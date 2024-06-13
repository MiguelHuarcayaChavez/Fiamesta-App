// server/server.js
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// Ruta para servir el archivo db.json
app.get('/api/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'db.json'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
