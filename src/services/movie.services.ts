import {
  iAllMoviesReturn,
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
  returnAllMovies,
  returnMovieSchema,
} from "../schemas/movieSchemas";

const create = async (data: iMovie): Promise<iMovieReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepo.create(data);

  await movieRepo.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};

const read = async (query: any): Promise<iPagination> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const page: number = Number(query.page) || 1;
  const perPage: number = Number(query.perPage) || 5;
  const sort: string =
    query.sort !== "price" && query.sort !== "duration" ? "id" : query.sort;

  const order =
    query.order !== "desc" && query.order === undefined ? "asc" : query.order;

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
    count: findMovies.length,
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
