import { Router } from "express";
import { movieControllers } from "../controllers";
import {
  validatedData,
  ensureMovieExist,
  ensureNameMovieExistMiddleware,
} from "../middlewares";
import { movieSchema, movieUpdateSchema } from "../schemas/movieSchemas";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  validatedData.verify(movieSchema),
  ensureNameMovieExistMiddleware.verify,
  movieControllers.create
);
movieRoutes.get("", movieControllers.read);
movieRoutes.patch(
  "/:id",
  ensureMovieExist.verify,
  validatedData.verify(movieUpdateSchema),
  ensureNameMovieExistMiddleware.verify,
  movieControllers.update
);
movieRoutes.delete("/:id", ensureMovieExist.verify, movieControllers.del);

export default movieRoutes;
