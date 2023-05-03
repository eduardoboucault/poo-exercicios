import express, { Request, Response } from "express";
import cors from "cors";
import { VideosDatabase } from "./database/VideosDatabase";
import { TVideosDb } from "./types/types";
import { Video } from "./models/models";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

const VIDEOS_DB = new VideosDatabase();

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong!");
});

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const q = req.query.q;

    if (typeof q !== "string") {
      res.status(400);
      throw new Error("O formato string deve ser respeitado.");
    }

    const result = await VIDEOS_DB.findVideos(q);

    const videos: Video[] = result.map(
      (video) =>
        new Video(video.id, video.title, video.duration, video.created_at)
    );
    res.status(200).send(videos);
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
      res.status(400);
      throw new Error("Insira dados válidos.");
    }

    const videoDBExist = await VIDEOS_DB.findVideosById(id);

    if (videoDBExist) {
      res.status(400);
      throw new Error("Esta ID já está cadastrada.");
    }

    const newVideo = new Video(id, title, duration, new Date().toISOString());

    const newVideoDB: TVideosDb = {
      id: newVideo.getId(),
      title: newVideo.getTitle(),
      duration: newVideo.getDuration(),
      created_at: newVideo.getCreatAt(),
    };

    const result = await VIDEOS_DB.insertVideo(newVideoDB);

    res.status(201).send("VIDEO XUXADO COM SUCESSO!");
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
    //* Receber params de direcionamento para path da endpoint via key/value;

    const id = req.params.id;
    const title = req.body.title;

    //* Validar params e variável title;

    if (!id || !title) {
      res.status(400);
      throw new Error("Digite os valores corretamente.");
    }

    if (typeof title !== "string") {
      res.status(400);
      throw new Error("Title deve ser no formato string");
    }

    //* Buscar no banco de dados com o método do class da entidade videos;

    const videoDBExist = await VIDEOS_DB.findVideosById(id);

    if (!videoDBExist) {
      res.status(400);
      throw new Error("ID não encontrada.");
    }

    //* Instanciar novo objeto com valores baseados no que foi encontrado em videoDBExist;

    const video = new Video(
      videoDBExist.id,
      videoDBExist.title,
      videoDBExist.duration,
      videoDBExist.created_at
    );

    const newTitle = video.setTitle(title);

    await VIDEOS_DB.updateTitleVideo(newTitle, id);

    res.status(201).send("Vídeo alterado com sucesso!");
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

app.delete("/videos/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      throw new Error("Digite um ID.");
    }

    await VIDEOS_DB.deleteVideo(id);

    res.status(201).send("Vídeo deletado com sucesso.");
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
