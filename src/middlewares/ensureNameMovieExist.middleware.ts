import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  const findMovie = await movieRepo.findOne({
    where: {
      name: `${req.body.name}`,
    },
  });

  if (findMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default { verify };
