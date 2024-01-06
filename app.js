const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let efemerides = loadEfemerides();

function loadEfemerides() {
  try {
    const data = fs.readFileSync('efemerides.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al cargar efemérides:', err.message);
    return {};
  }
}

function saveEfemerides() {
  try {
    fs.writeFileSync('efemerides.json', JSON.stringify(efemerides, null, 2), 'utf8');
  } catch (err) {
    console.error('Error al guardar efemérides:', err.message);
  }
}

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
  saveEfemerides(); // Guardar efemérides después de agregar una nueva
  res.json(efemerides[mes]);
});

// Actualizar una efeméride específica
app.put('/:mes/:indice', (req, res) => {
  const mes = req.params.mes.toLowerCase();
  const indice = parseInt(req.params.indice);
  const actualizacionEfemeride = req.body;

  if (efemerides[mes] && efemerides[mes][indice]) {
    efemerides[mes][indice] = actualizacionEfemeride;
    saveEfemerides(); // Guardar efemérides después de la actualización
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
    saveEfemerides(); // Guardar efemérides después de la eliminación
    res.json(efemerides[mes]);
  } else {
    res.status(404).send('Efeméride no encontrada');
  }
});

app.listen(port, () => {
  console.log(`La aplicación está corriendo en http://localhost:${port}`);
});
