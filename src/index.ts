import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import  userRoutes  from "./routes/userRoutes";
dotenv.config();

const app: Express = express();
const port = 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
