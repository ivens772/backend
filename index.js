import express from 'express';
const app = express();
import mysql from 'mysql2';
import cors from 'cors';

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'm9qs0itfqzhqssp7',
    password: 'stduzq3orxn0esb2',
    database: 'en6ennpqmm7h249w'
});
//m9qs0itfqzhqssp7:stduzq3orxn0esb2@uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/en6ennpqmm7h249w
db.connect((err,con)=>{
 if(err) console.log("no connection")
 else{
   console.log("successfully")
   }
});
app.get('/',(req,res)=>{
    res.send("welcome heroku")
})
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
                res.json(result);
            }
        });

});

app.get('/empleados', (req, res) => {
    db.query("select * from empleados", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("probando nuevo metodo");
            res.send("estas en empleados")
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
                console.log(result);
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