import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong!");
});

app.get("/videos", (req: Request, res: Response) => {});
app.post("/videos", (req: Request, res: Response) => {});
app.put("/videos/:id", (req: Request, res: Response) => {});
app.delete("videos/:id", (req: Request, res: Response) => {});
