import DirectionsCli from "./DirectionsCli";
import { Request } from "express";
import { DirectionsParams } from "./DirectionsParams";
import { DirectionsRequest } from "@googlemaps/google-maps-services-js";

export default class DirectionsService extends DirectionsCli {
  constructor () {
    super();
  }

  getDirection = async (req: Request<{},{},{},DirectionsParams>) => {
    
    const directionReq: DirectionsRequest = 
      { params : {
        origin: req.query.origin,
        destination: req.query.destination,
        key: process.env.APIKEY } };
      
      return this.directionsCli.directions(directionReq)
      .then((directionRes) => { return directionRes.data })
      .catch((error) => { return `Erro! ${error.message}`});
      
  }
}