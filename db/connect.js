const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("connected to the database"))
    .catch((err) => console.log(err));
}
module.exports = connectDB;