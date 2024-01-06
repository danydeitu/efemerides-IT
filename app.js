const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

const efemerides = require('./efemerides.json');

// Obtener todas las efemérides de un mes
app.get('/:mes', (req, res) => {
  const mes = req.params.mes.toLowerCase();

  if (efemerides[mes]) {
    res.json(efemerides[mes]);
  } else {
    res.status(404).send('Mes no encontrado');
  }
});

// Añadir una nueva efeméride para un mes
app.post('/:mes', (req, res) => {
  const mes = req.params.mes.toLowerCase();
  const nuevaEfemeride = req.body;

  if (!efemerides[mes]) {
    efemerides[mes] = [];
  }

  efemerides[mes].push(nuevaEfemeride);
  res.json(efemerides[mes]);
});

// Actualizar una efeméride específica
app.put('/:mes/:indice', (req, res) => {
  const mes = req.params.mes.toLowerCase();
  const indice = parseInt(req.params.indice);
  const actualizacionEfemeride = req.body;

  if (efemerides[mes] && efemerides[mes][indice]) {
    efemerides[mes][indice] = actualizacionEfemeride;
    res.json(efemerides[mes]);
  } else {
    res.status(404).send('Efeméride no encontrada');
  }
});

// Eliminar una efeméride específica
app.delete('/:mes/:indice', (req, res) => {
  const mes = req.params.mes.toLowerCase();
  const indice = parseInt(req.params.indice);

  if (efemerides[mes] && efemerides[mes][indice]) {
    efemerides[mes].splice(indice, 1);
    res.json(efemerides[mes]);
  } else {
    res.status(404).send('Efeméride no encontrada');
  }
});

app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});


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
