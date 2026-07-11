import express, { type Application } from "express"
import morgan from "morgan";
import errorHandler from "./middlewares/error.middleware.js";
import exceptionRouter from "./routes/exception.routes.js";
import dashbaordRouter from "./routes/dashboard.routes.js";

const app : Application = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use("/excetions", exceptionRouter);
app.use("/dashboard", dashbaordRouter);

app.use(errorHandler);

export default app;