const express = require('express');
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB,
});

app.use(express.json());


app.post('/movies', (req, res) => {
    const movieData = req.body;

    const insertQuery = 'INSERT INTO movie SET ?';

    db.query(insertQuery, movieData, (err, results) => {
        if (err) {
            console.error('Error al insertar la película: ', err);
            res.status(500).send('Error al insertar la película.');
            return;
        }

        res.status(200).json({ message: 'Película insertada correctamente', insertedId: results.insertId });
    });
});

app.patch('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    const updateQuery = 'UPDATE movie SET ? WHERE movie_id = ?';

    db.query(updateQuery, [updatedMovieData, movieId], (err, results) => {
        if (err) {
            console.error('Error al actualizar la película: ', err);
            res.status(500).send('Error al actualizar la película.');
            return;
        }

        res.status(200).json({ message: 'Película actualizada correctamente', affectedRows: results.affectedRows });
    });
});

app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;

    const selectQuery = 'SELECT * FROM movie WHERE movie_id = ?';

    db.query(selectQuery, movieId, (err, results) => {
        if (err) {
            console.error('Error al obtener la película: ', err);
            res.status(500).send('Error al obtener la película.');
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Película no encontrada' });
        } else {
            res.status(200).json(results[0]);
        }
    });
});

app.get('/movies', (req, res) => {
    const selectAllQuery = 'SELECT * FROM movie';

    db.query(selectAllQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener las películas: ', err);
            res.status(500).send('Error al obtener las películas.');
            return;
        }

        res.status(200).json(results);
    });
});

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;

    const deleteQuery = 'DELETE FROM movie WHERE movie_id = ?';

    db.query(deleteQuery, movieId, (err, results) => {
        if (err) {
            console.error('Error al eliminar la película: ', err);
            res.status(500).send('Error al eliminar la película.');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Película no encontrada para eliminar' });
        } else {
            res.status(200).json({ message: 'Película eliminada correctamente', affectedRows: results.affectedRows });
        }
    });
});

app.get('/test_connection', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Fail when connect to MySql Connected');
        } else {
            console.log("MySql Connected");
            res.send('MySql Connected');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
