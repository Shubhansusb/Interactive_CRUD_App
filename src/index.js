const cors = require('cors');
const express= require('express')
const mongoose= require('mongoose')
const PORT= 8000;

const Router = require('./Routes/routes.js')

const app = express();
app.use(express.json());
app.use(Router);

mongoose.connect("mongodb://localhost:27017/RFlabs", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

mongoose.connection.on('open', () => {
    console.log('connected to the database');

     app.use('/api', Router);
   

    app.listen(PORT, () => {
        console.log(`server is up and alive at ${PORT}`);
    })
});
