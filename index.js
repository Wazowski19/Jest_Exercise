//const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())
let notes = [
    {
        "id": 1, 
        "content": "Tengo que aumentar el numero de bugs",
        "date": "2022-06-20",
        "important": true
    },
    {
        "id": 2, 
        "content": "Tengo que completar los cursos propuestos en el año",
        "date": "2022-12-31",
        "important": false
    },
    {
        "id": 3, 
        "content": "Tengo que preparar el proximo training pill",
        "date": "2022-08-14",
        "important": true
    }
]

/* const app = http.createServer((request, response) =>{
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(notes))
}) */

app.get('/', (request, response) =>{
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request,response) =>{
    response.json(notes)
})

app.get('/api/notes/:id', (request,response) =>{
    const id = Number(request.params.id)
    const note = notes.find(note =>  note.id === id)

    if(note){
        response.json(note)
    }else{
        response.status(404).end() 
    }
})

app.delete('/api/notes/:id', (request, response)=>{
    const id = Number(request.params.id) 
    notes = notes.filter(note => note.id !== id)
    response.status(204).end() 
})

app.post('/api/notes', (request, response)=>{
    const note = request.body

    if(!note || !note.content){
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids  = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }
    
    //notes = [...notes, newNote]
    notes = notes.concat(newNote)

    response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})