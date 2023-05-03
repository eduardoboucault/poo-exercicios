import { IVideos } from "../models/models";
import { TVideosDb } from "../types/types";
import { BaseDatabase } from "./BaseDatabase";

//* Criar class que herdará da super class atributos e métodos. Pela super class se tratar de uma abstract class de base de dados, esta class é específica para redirecionar a entidade que será focada. No caso a entidade Videos do banco de dados;

//* Class responsável por única e exclusivamente ter a responsabilidade de criar conexão com banco de dados em relação a entidade Vídeos;

export class VideosDatabase extends BaseDatabase {
  //* Criar método estático que será usado nos demais métodos. No caso, ao invés de usar a string mockada da entidade do banco de dados, criaremos uma variável nomeada;

  public static TABLE_VIDEOS = "videos";

  //* Método para busca de vídeos da entidade videos;

  //* Método de banco de dados sempre espera algum retorno, então ele é assíncrono, ele espera(await) uma promessa(promise) do banco de dados;

  //? FindVideos recebe um parâmetro q que pode ou não ser definido, e ele irá retornar um promessa no formato do type Videos DB. Este método tem como função retornar os objetos da entidade vídeos baseado no nome em comparação com o parâmetro q;

  //? Este método é bom para poder matar 2 coelhos numa cajadada só, ou retorna um vídeo do nome x ou retorna todos de uma só vez;

  public async findVideos(q: string | undefined): Promise<TVideosDb[]> {
    //* videosDB inicia sem valor definido e se o parâmetro q for passado ele faz uma conection com a entidade videos e procura onde o nome for igual ao parâmetro q;

    let videosDB;
    if (q) {
      const result: TVideosDb[] = await VideosDatabase.conection(
        VideosDatabase.TABLE_VIDEOS
      ).where("title", "LIKE", `%${q}%`);
      videosDB = result;
    } else {
      const result: TVideosDb[] = await VideosDatabase.conection(
        VideosDatabase.TABLE_VIDEOS
      );
      videosDB = result;
    }

    return videosDB;
  }

  public async findVideosById(
    id: string
  ): Promise<IVideos> {
    console.log(id)
    const [videoDBExist]:IVideos[] =
      await VideosDatabase.conection(VideosDatabase.TABLE_VIDEOS).where({ id });
      console.log(videoDBExist)
    return videoDBExist;
  }

  public async insertVideo(newVideoDB: IVideos): Promise<void> {
    await VideosDatabase.conection(VideosDatabase.TABLE_VIDEOS).insert(
      newVideoDB
    );
  }

  public async updateTitleVideo(newTitle: string, id: string): Promise<void> {
    await VideosDatabase.conection(VideosDatabase.TABLE_VIDEOS)
      .update({ title: newTitle })
      .where({ id });
  }

  public async deleteVideo(id: string): Promise<void> {
    await VideosDatabase.conection(VideosDatabase.TABLE_VIDEOS)
      .delete()
      .where({ id });
  }
}
