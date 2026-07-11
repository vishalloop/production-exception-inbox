import express, { type Application } from "express"
import morgan from "morgan";
import errorHandler from "./middlewares/error.middleware.js";

const app : Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(errorHandler);

export default app;