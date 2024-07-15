const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const port = 3333

const app = express()
app.use(bodyParser.json());

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/todo-list')
    .then(() => console.log('Mongoose Connected Successfully'))
    .catch((error) => console.log('Mongoose Connection Error', error))

//routes
app.get('/', (request, response) => {
    return response.send('Hey! Welcom to Todo List Webb Application.👩‍💻🔃')
})
app.use('/api/auth', require('./routes/login'));
app.use('/api/todos', require('./routes/todos'));

app.listen(port, () => console.log(`Your Server Started Successfully.💻😀 on port ${port}`))