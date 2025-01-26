// import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import xssClean from "xss-clean";
import { StatusCodes } from "http-status-codes";
import { clientBadRequestError, clientPathNotFoundError } from "./middlewares/appErrors";

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(bodyParser.json())

//CORS Config
const corsOption = {
  origin: "*",
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(cors(corsOption))

app.use(xssClean())

app.disable("x-powered-by")

const apiPath = "/api-v1"

app.get(apiPath, (_: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .json({
      message: "Welcome to my play ground",
      statusCode: 200,
      data: {},
    });
});

app.use(clientBadRequestError)
app.use(clientPathNotFoundError)

export default app;