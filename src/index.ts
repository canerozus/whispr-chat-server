import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";
dotenv.config();

const app: Express = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//Routes
app.use("/api/users", userRoutes);

app.listen(port, async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log("MONGODB CONNECTED");
    })
    .catch((error) => console.log(`${error} did not connect`));
});
