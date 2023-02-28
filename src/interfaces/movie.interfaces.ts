import {
  movieSchema,
  returnAllMoviesSchema,
  returnMovieSchema,
} from "../schemas/movieSchemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";

type iMovie = z.infer<typeof movieSchema>;
type iMovieReturn = z.infer<typeof returnMovieSchema>;
type iAllMoviesReturn = z.infer<typeof returnAllMoviesSchema>;
type iMovieUpdate = DeepPartial<Movie>;

type iMovieRepo = Repository<Movie>;

interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Movie[];
}

export {
  iMovie,
  iMovieReturn,
  iMovieRepo,
  iAllMoviesReturn,
  iMovieUpdate,
  iPagination,
};
