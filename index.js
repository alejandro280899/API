const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PUERTO = 3000

const conexion = mysql.createConnection(
    {
        host:'localhost',
        database:'apibrewride',
        user:'root',
        password:''
    }
)

app.listen(PUERTO, ()=>{
    console.log(`Server corriendo en puerto ${PUERTO}`);
})

conexion.connect(error => {
    if(error) throw error
    console.log('Conectado a la base de datos');

})

app.get('/', (req, res) =>{
    res.send('API')
})

app.get('/usuarios', (req, res) => {
    const query = `SELECT * FROM usuarios;`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)
        
        const obj = {}
        if(resultado.length > 0) {
            obj.listaUsuarios = resultado
            res.json(obj)
        }else{
            res.json({mensaje: 'No hay usuarios registrados'})
        }
    })  
})

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM usuarios;`
    conexion.query(query, (error, resultado) => {
        if(error) return console.error(error.message)
        
        if(resultado.length > 0) {
            res.json = (resultado)
        }else{
            res.json({mensaje: 'No hay usuarios registrados'})
        }
    })
    
})

app.post('/usuario/add', (req, res) => {
    const usuario = {
       nombre : req.body.nombre,
        email: req.body.email
    }

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario,(error) => {
        if(error) return console.error(error.message)
        
            res.json('Se inserto correctamente el usuario')
    }) 
})

app.put('/usuario/update/:id', (req, res) => {
    const {id} = req.params
    const {nombre, email} = req.body

    const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}', WHERE idUsuario='${id}';`
    conexion.query(query,(error) => {
        if(error) return console.error(error.message)
        
            res.json('Se inserto correctamente el usuario')
    }) 
})

app.delete('/usuario/delete/:id', (req, res) => {
    const {id} = req.params
    const query = `DELETE FROM usuarios WHERE idUsuario`
    conexion.query(query,(error) =>{
     if(error) console.error(error.message)
        
        res.json('Se elimino correctamente el usuario')
 
})

})