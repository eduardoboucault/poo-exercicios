export class Video {
  constructor(
    private id: string,
    private title: string,
    private duration: number,
    private createAt: string
  ) {}

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDuration(): number {
    return this.duration;
  }

  public getCreatAt(): string {
    return this.createAt;
  }

  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  public setDuration(newDuration: number): void {
    this.duration = newDuration;
  }
}
