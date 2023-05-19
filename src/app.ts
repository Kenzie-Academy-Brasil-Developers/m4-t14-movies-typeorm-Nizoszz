import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import movieRoutes from "./routers/movie.routes";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(handleErrors);

export default app;
