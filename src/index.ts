  import * as dotenv from "dotenv";
  import express from "express";
  import cors from "cors";
  import { directionsRouter } from "./directions/directions.router";

 dotenv.config();
/**
 * App Variables
 */
  if (!process.env.PORT) {
    process.exit(1);
  }

  const PORT: number = process.env.PORT;

  const app = express();
/**
 *  App Configuration
 */
  app.use(cors());

  app.use(express.json());

  app.use("/api/directions", directionsRouter);
/**
 * Server Activation
 */
  app.listen(PORT, () => {
    
    console.log(`Listening on port ${PORT}`);
    
  })