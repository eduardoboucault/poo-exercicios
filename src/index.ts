import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { TVideosDb, Videos } from "./types/types";
import { Video } from "./models/models";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong!");
});

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const videos = await db.select().from("videos");
    if (videos && videos.length > 0) {
      res.status(200).send(videos);
    } else {
      res.status(400).send("Não achamos nenhum vídeo no banco de dados.");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

app.post("/videos", async (req: Request, res: Response) => {
  try {
    const { id, title, duration } = req.body;

    if (
      !id ||
      !title ||
      typeof id !== "string" ||
      typeof title !== "string" ||
      isNaN(duration)
    ) {
      res.status(400).send("Dados inválidos");
    }

    const [videoDBExist]: Videos[] | undefined[] = await db("videos").where({
      id,
    });

    if (videoDBExist) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const createAt = new Date().toISOString();

    const newVideo = new Video(id, title, duration, createAt);

    const newVideoDB: TVideosDb = {
      id: newVideo.getId(),
      title: newVideo.getTitle(),
      duration: newVideo.getDuration(),
      createAt: newVideo.getCreatAt(),
    };

    const result = await db("videos").insert(newVideoDB);

    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

app.put("/videos/:id", async (req: Request, res: Response) => {
  try {
    const q = req.params.q;
    let videos;
    if (q) {
      const result = await db("videos").where("id", "LIKE", { q });
      videos = result;
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});

app.delete("videos/:id", (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado.");
    }
  }
});
