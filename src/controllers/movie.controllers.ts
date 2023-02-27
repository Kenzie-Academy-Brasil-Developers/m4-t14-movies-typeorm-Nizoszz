import { Request, Response } from "express";
import { iMovie, iMovieUpdate } from "../interfaces/movie.interfaces";
import { movieService } from "../services";

const create = async (req: Request, res: Response) => {
  const data: iMovie = req.body;

  const newMovie = await movieService.create(data);

  return res.status(201).json(newMovie);
};

const read = async (req: Request, res: Response) => {
  const movies = await movieService.read(req.query);

  return res.status(200).json(movies);
};

const update = async (req: Request, res: Response) => {
  const movie: iMovieUpdate = req.body;
  const id: number = Number(req.params.id);

  const movieUpdate = await movieService.update(movie, id);

  return res.json(movieUpdate);
};

const del = async (req: Request, res: Response) => {
  const deleteMovie = await movieService.del(Number(req.params.id));

  return res.status(204).send();
};

export default { create, read, update, del };
