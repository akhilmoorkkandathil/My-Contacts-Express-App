const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');
require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 6000 ;

app.use(express.json());
app.use("/api/contacts",require('./routes/contactRoutes'))
app.use("/api/users",require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})


