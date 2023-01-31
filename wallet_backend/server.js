const express = require('express')
const cors = require('cors')


const dbConnect = require('./config/db/dbConnection')



const app = express()

const userRoutes = require('./routes/userRoute')


//Middleware
app.use(express.json())

//cors
// app.use(cors());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        method : ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
);

// User Route
app.use('/api/v1',userRoutes)






const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is Running ${PORT}`))
