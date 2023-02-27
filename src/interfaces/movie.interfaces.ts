import {
  movieSchema,
  returnAllMovies,
  returnMovieSchema,
} from "../schemas/movieSchemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";

type iMovie = z.infer<typeof movieSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iAllMoviesReturn = z.infer<typeof returnAllMovies>;
type iMovieUpdate = DeepPartial<iMovieReturn>;

type iMovieRepo = Repository<Movie>;

interface iPagination {
  previousPage: string | null;
  nextPage: string | null;
  count: number;
  data: iMovie[];
}

export {
  iMovie,
  iMovieReturn,
  iMovieRepo,
  iAllMoviesReturn,
  iMovieUpdate,
  iPagination,
};
