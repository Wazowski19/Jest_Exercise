require('dotenv').config()

require('./mongo.js')

const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')
const Note = require('./models/Note.js')
const notFound = require('./middlewares/notFound.js')
const handleErrors = require('./middlewares/handleErrors.js')

app.use(cors())
app.use(express.json())

app.use(logger)


app.get('/', (request, response) =>{
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request,response) =>{
    Note.find({}).then(notes =>{
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request,response, next) =>{
    const {id} = request.params
    
    Note.findById(id).then(note=>{
        if(note){
            return response.json(note)
        }else{
            response.status(404).end()
        }
    }).catch(err =>{
        next(err)
    })

})

app.put('/api/notes/:id', (request, response, next)=>{
    const note = request.body
    const {id} = request.params
    
    const newNoteInfo = {
        content: note.content,
        important: note.important || false
    }
    Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
        .then(result =>{
            response.json(result)
        })
})

app.delete('/api/notes/:id', (request, response, next)=>{
    const {id} = request.params
    Note.findByIdAndDelete(id).then(() =>{
        response.status(204).end() 
    }).catch(error => next(error))
})

app.post('/api/notes', (request, response)=>{
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
    })

    newNote.save()/* .then(savedNote =>{
        response.setHeader("Content-Type", "application/json");
        return response.status(201).json({note: savedNote})
        
    }).catch(err =>{
        console.error(err)
    }) */

    response.status(201).json(newNote)
})

app.use(notFound)

app.use(handleErrors)


const PORT = process.env.PORT
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})