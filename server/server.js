require("dotenv").config();

const express = require("express");
const app = express()
const cors = require("cors");
const authroute = require("./router/auth-router");//auth-router is required then it is used below(1) by specifying the path
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

//handle CORS

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
/*It's important to place this before any routes or middleware that need to handle JSON data in the request body, as it ensures that the incoming JSON payloads are parsed and made accessible in the req.body object before reaching subsequent handlers or routes. This way, other parts of your application can easily access and work with the JSON data sent in the request.*/
app.use("/api/auth", authroute);//(1)
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware); //ERROR MIDDLEWARE
const PORT=5000;

//only display server running on port after the connection is established with the database
connectDb().then(() =>{
    app.listen(PORT , ()=>{
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    })
});
