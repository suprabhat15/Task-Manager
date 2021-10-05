const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require("./db/connect");
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

require('dotenv').config();


// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
// app.get('/hello', (req, res) => {
//     res.send("Hello Task Manager");
// })

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// api.get('/api/v1/tasks');  - to get all tasks
// api.post('/api/v1/tasks');  - create a new task
// api.get('/api/v1/tasks/:id');  - to get a particular task
// api.patch('/api/v1/tasks/:id');  - to update a particular task
// api.delete('/api/v1/tasks/:id');  - to delete a particular task

const port = process.env.PORT || 3000;

const start = async () => {
    try {
     await connectDB(process.env.MONGO_URI);
     app.listen(port, console.log(`server is listening at ${port}`));
    }
    catch(err){
        console.log(error);
    }
}

start()