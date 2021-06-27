export abstract  class PostIt {
  abstract getId(): string;
  abstract getTitle(): string;
  abstract getText(): string;

  getColor(): string {
    return '#FCD34D';
  }

}
