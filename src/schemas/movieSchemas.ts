import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number(),
  price: z.number(),
});

const returnMovieSchema = movieSchema.omit({ id: true });

const returnAllMovies = returnMovieSchema.array();

const movieUpdateSchema = movieSchema.deepPartial();

export { movieSchema, returnMovieSchema, returnAllMovies, movieUpdateSchema };
