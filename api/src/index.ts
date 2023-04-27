require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { createConnection } from "typeorm";

createConnection().then((connection) => {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

  routes(app);
  const port = process.env.PORT || 8000;
  app.listen(8000, () => {
    console.log(`listening to port  ${port}`);
  });
});
