const express = require('express');
const routes = require('./routes/routes.js')
const app = express();
const port = 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app)

app.listen(port, () => {
    console.log(`El servidor se encuentra escuchando en el puerto ${port}`)
} )