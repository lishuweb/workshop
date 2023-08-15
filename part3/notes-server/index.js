const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

app.use(express.static("build"));

mongoose.set('strictQuery',false);
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
})

const Note = mongoose.model('Note', noteSchema)     //collection name

app.use(express.json());
app.use(cors());


const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:", request.path);
    console.log("body:", request.body);
    console.log("hello!");
    next();
};

app.use(requestLogger);

let notes = [];

app.get('/api/notes', (request, response) => {
    Note.find({}).then((result) => {
        response.send(result);
    })
    // response.json(notes);
});

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(result => {
    if(result)
    {
        response.json(result);
    }
    else 
    {
        response.status(404).send(`There are no notes at ${request.params.id}`);
    }
    }).catch((e) => {
        next(e);
    })
});

app.put("/api/notes/:id", (request, response, next) => {
    const body = request.body;
  
    const note = {
      content: body.content,
      important: body.important,
    };
  
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then((updatedNote) => {
        response.json(updatedNote);
      })
      .catch((error) => next(error));
  });

app.delete("/api/notes/:id", (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => next(error));
});
  

// app.post("/api/notes", (request, response) => {
//     const myNewPost = request.body;
//     myNewPost.id = notes.length + 1;
//     notes.push(myNewPost);
//     response.status(201).json(myNewPost);
//     // console.log(myNewPost);

//     // const note = new Note({
//     //     content: 'HTML is Easy',
//     //     important: true,
//     //   })
      
//     //   note.save().then(result => {                    //note bata input garna note.save()
//     //     console.log('note saved!')
//     //     mongoose.connection.close()
//     //   })

// });
app.post("/api/notes", (request, response) => {
    const body = request.body;
  
    if (body.content === undefined) {
      return response.status(400).json({ error: "content missing" });
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
    });
  
    note.save().then((savedNote) => {
      response.json(savedNote);
    });
  });
  

app.use((request, response, next) => {
    response.status(404).send("No code available to handle this request");
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' });
    } 
  
    next(error)
}
  
app.use(errorHandler);

app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`);




// const app = http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/json" });       //reponse type
//     response.end(JSON.stringify(notes));                                     //actual response
// });