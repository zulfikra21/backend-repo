import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import bodyParser from 'body-parser';
import route from '../routes/userRoutes';
import cors from "cors";

dotenv.config()
// initial server
const app = express()
const port = process.env.PORT;

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// app.options("*",cors("*"));
app.use(cors())
// Config body parser of JSON
app.use(bodyParser.json())

// Routes
app.use("/", route)

app.listen(port, () => console.log("server run on port " + port))