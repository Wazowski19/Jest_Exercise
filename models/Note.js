const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

//Buscar todas las notas
/* Note.find({}).then(result =>{
    console.log(result)
    mongoose.connection.close()
}).catch(err =>{
    console.error(err)
}) */

//Crear nota
/* const note = new Note({
    content: 'No olvidar hacer los training de GD',
    date: new Date(),
    important: true
})

note.save()
    .then(result =>{
        console.log(result)
        mongoose.connection.close()
    }).catch(err =>{
        console.error(err)
    }) */

module.exports = Note