const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const providersRouter = require('./routes/providers');

app.use(express.json());
app.use(cors());

app.use('/providers', providersRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});