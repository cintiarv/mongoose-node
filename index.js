import mongoose from "mongoose"; //podemos utilizar módulos ya que agregamos type:module en el json.package. conectándonos con mongo
import * as dotenv from 'dotenv'
dotenv.config()

//console.log(process.env);


const {DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env //datos guardados en .env 


const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` //uri que nos da mongo para podernos conectar 


/* 
Modelo (término de mongoose) nos permite generar la integridad de nuestros datos -> un modelo hará referencia a una colección 
    Será una interfaz que nos permitirá comunicarnos con la base de datos 
    -> crear, actualizar, editar, consultar

Para crear un modelo necesitamoso un Shcema 
Schema: -> que datos tiene el documento como una plantilla 
    Nos permitirá definir la estructura de los documentos 
    -Qué campos tendrá el doc (name, lastName, age, etc)
    -Validaciones (requerido)
    -Restricciones
*/


//Schema de koders
const koderSchema = new mongoose.Schema({ //recibirá un objeto
    name: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true //si este nombre viene con espacios al principio y al final que los borre
    },
    lastName: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true 
    },
    age: {
        type: Number, 
        required: true,
        min: 1,
        max: 100,
    },
    gender: {
        type: String, 
        required: true,
        enum: ['h', 'm'] //este campo solo podrá recibir h o m -> solo estos dos valores son válidos
    },
    isGraduated: {
        type: Boolean,
        default: false //si yo no pongo nada en este campo arrojará false 
    }
})

//ya creamos el schema ahora si crear el modelo
const Koder = mongoose.model('koders', koderSchema) //1era en mayus -> (nombre de colección a la que hacemos referencia, el esquema realizado)

//ahora si podemos comunicarsno con la colección de koders en la base de datos ya puedo hacer el CRUD




mongoose.connect(URL) //regresa una promesa
    .then(async (connection) => {
        console.log('Database conected c:'); //aquí ya puedo hacer mi llamado a mi db 

       const allKoders = await Koder.find({}) //traer todos los koders. todas las acciones cuando uses una db son asíncronas por lo tanto regresa una promesa 
        console.log(allKoders);  

        //crear un koder en mongo se usa create 
 
        const newKoder = {
            name: 'Rodri',
            lastName: 'Montoya',
            age: 22,
            gender: 'h'
        }
         const koderCreated = await Koder.create(newKoder)
        console.log(koderCreated);   

        //actualizar un koder 
       /*  const newData = {
            lastName: 'Ruiz Verdugo'
        }
        const koderUpdated = await Koder.findByIdAndUpdate('633ceecc77adfb6bdaf27ad8', newData, {new: true}) //para que nos regrese el dato actualizado, no el anterior
        console.log(koderUpdated);
 */

       /*  //eliminar un koder
        const koderDeleted = await Koder.findByIdAndDelete('633ceecc77adfb6bdaf27ad8') 
        console.log(koderDeleted);

 */
    })
    .catch((err) => {
        console.log('Error: ', err);
    })