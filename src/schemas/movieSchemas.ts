import { z } from "zod";

const movieSchema = z.object({
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number(),
  price: z.number(),
});

const returnMovieSchema = movieSchema.extend({
  id: z.number(),
});

const returnAllMoviesSchema = z
  .object({
    prevPage: z.string().nullable(),
    nextPage: z.string().nullable(),
    count: z.number(),
    data: returnMovieSchema.array(),
  })
  .array();

const movieUpdateSchema = movieSchema.deepPartial();

export {
  movieSchema,
  returnMovieSchema,
  returnAllMoviesSchema,
  movieUpdateSchema,
};
