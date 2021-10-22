import express, { Request, Response } from "express";
import DirectionsService from "./directions.service";
import { DirectionsParams } from "./DirectionsParams";

export const directionsRouter = express.Router();

const directionsService: DirectionsService = new DirectionsService();

// Tipando os params do endpoint
type DestinationParams = {
  origin: string;
  destination: string;
}

// Instanciando o Client
directionsRouter.get("/example/local", async (req: Request<{},{},{},DirectionsParams>, res: Response) => {
  return res.status(200).json(await directionsService.getDirection(req));
});