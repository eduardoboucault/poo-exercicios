export interface IVideos {
  id: string,
  title: string,
  duration: number,
  created_at: string
}
export class Video {
  constructor(
    private videos: IVideos,
  ) {}

  public getId(): string {
    return this.videos.id;
  }

  public getTitle(): string {
    return this.videos.title;
  }

  public getDuration(): number {
    return this.videos.duration;
  }

  public getCreatAt(): string {
    return this.videos.created_at;
  }

  public setTitle(newTitle: string): void {
    this.videos.title = newTitle;
  }

  public setDuration(newDuration: number): void {
    this.videos.duration = newDuration;
  }
}
