import { Client } from "@googlemaps/google-maps-services-js";

let directionsCli : Client | null = null;

export default class DirectionsCli {
  directionsCli: Client;
  
  constructor () {
    if (!directionsCli)
      directionsCli = new Client({});

    this.directionsCli = directionsCli;
  }

}