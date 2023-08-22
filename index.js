import express from 'express';
const app = express();
import mysql from 'mysql2';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'ivens772',
    password: '123456',
    database: 'empleados_crud'
});
app.post('/create', (req, res) => {
    const result = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        pais: req.body.pais,
        cargo: req.body.cargo,
        anios: req.body.anios
    }
    db.query("insert into empleados set ?", [result],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
            res.send(result);
            }
        });

});

app.get('/empleados', (req, res) => {
    db.query("select * from empleados", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const result = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        pais: req.body.pais,
        cargo: req.body.cargo,
        anios: req.body.anios
    }
    db.query("update  empleados set ? where id = ?", [result, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("actualizando");
            }
        });

});
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("delete from  empleados  where id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });

});
app.listen(PORT, (req, res) => {
    console.log("corriendo en el puerto ", PORT);
});