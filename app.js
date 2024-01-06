const express = require('express');
const app = express();
const port = 3000;

// módulo fs para leer el archivo JSON
const fs = require('fs');
const efemerides = require('./efemerides.json');

app.get('/:mes', (req, res) => {
  const mes = req.params.mes.toLowerCase();

  if (efemerides[mes]) {
    res.json(efemerides[mes]);
  } else {
    res.status(404).send('Mes no encontrado');
  }
});

 app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});
