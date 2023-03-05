import {
  iMovie,
  iMovieReturn,
  iMovieUpdate,
  iPagination,
} from "../interfaces/movie.interfaces";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { Repository } from "typeorm";
import { returnMovieSchema } from "../schemas/movieSchemas";

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

  let page: number = Number(payload.page) || 1;
  page = payload.page <= 0 ? 1 : page;

  let perPage: number = Number(payload.perPage) || 5;
  perPage = payload.perPage < 1 || payload.perPage > 5 ? 5 : perPage;

  let sort: string =
    payload.sort === "price" || payload.sort === "duration"
      ? payload.sort
      : "id";

  let order: string =
    payload.order === "asc" || payload.order === "desc" ? payload.order : "asc";

  if (payload.sort === undefined) {
    order =
      payload.order !== "asc" || payload.order !== "desc"
        ? "asc"
        : payload.order;
  }

  const findMovies: Movie[] = await movieRepo.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sort]: order,
    },
  });

  let prevPage: string | null = "";
  let nextPage: string | null = "";

  prevPage =
    page > 1
      ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
      : null;

  nextPage =
    page < 4
      ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  if (payload.perPage === undefined) {
    prevPage =
      page > 1
        ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
        : null;

    nextPage =
      page < 3
        ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
        : null;
  }

  if (payload.perPage && payload.page) {
    prevPage =
      page > 1
        ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
        : null;

    nextPage =
      page < 4
        ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
        : null;
  }

  const pagination: iPagination = {
    prevPage: prevPage,
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

  const update = returnMovieSchema.parse(movie);

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
