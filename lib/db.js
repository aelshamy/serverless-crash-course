const mongoose = require('mongoose')
mongoose
    .connect(process.env.DB)
    .then(() => console.log('database connnected successfully'))
    .catch(err => console.log("unable to connect to database"))