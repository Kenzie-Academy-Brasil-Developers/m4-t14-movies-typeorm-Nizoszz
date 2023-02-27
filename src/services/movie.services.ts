import {
  iMovie,
  iMovieReturn,
  iMovieUpdate,
  iPagination,
} from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import {
  movieSchema,
  returnAllMoviesSchema,
  returnMovieSchema,
} from "../schemas/movieSchemas";

const create = async (data: iMovie): Promise<iMovieReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepo.create(data);

  await movieRepo.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};

const read = async (payload: any): Promise<iPagination> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  const count: number = await movieRepo.count();

  const page: number = Number(payload.page) || 1;
  const perPage: number = Number(payload.perPage) || 5;
  const sort: string =
    payload.sort !== "price" && payload.sort !== "duration"
      ? "id"
      : payload.sort;

  const order =
    payload.order !== "desc" && payload.order === undefined
      ? "asc"
      : payload.order;

  const findMovies: Movie[] = await movieRepo.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sort]: order,
    },
  });

  const previousPage: string | null =
    page > 1
      ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
      : null;

  const nextPage: string | null =
    page < 5
      ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  const pagination: iPagination = {
    previousPage: previousPage,
    nextPage: nextPage,
    count: count,
    data: findMovies,
  };

  return pagination;
};

const update = async (data: iMovieUpdate, id: number): Promise<iMovie> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie: Movie | null = await movieRepo.findOneBy({
    id: id,
  });

  const movie = movieRepo.create({
    ...findMovie,
    ...data,
  });

  await movieRepo.save(movie);

  const update = movieSchema.parse(movie);

  return update;
};

const del = async (idMovie: number): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepo.findOne({
    where: {
      id: idMovie,
    },
  });

  await movieRepo.remove(movie!);
};

export default { create, read, update, del };
