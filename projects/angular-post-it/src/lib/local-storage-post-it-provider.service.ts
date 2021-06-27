import {PostItProviderService} from "./post-it-provider.service";
import {PostIt} from "./post-it";
import {BehaviorSubject, Observable, of, ReplaySubject, Subject} from "rxjs";
import {map} from "rxjs/operators";

class LocalStoragePostIt extends PostIt {

  constructor(private readonly id: string,
              private readonly title: string,
              private readonly text: string,
              private readonly color: string) {
    super();
  }

  getId(): string { return this.id; }
  getText(): string { return this.text; }
  getTitle(): string { return this.title; }
  getColor(): string { return this.color; }

}

export class LocalStoragePostItProviderService extends PostItProviderService {

  private readonly LS_KEY = 'post-it';
  private readonly get$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor() {
    super();
  }

  get(): Observable<Array<PostIt>> {
    return this.get$.pipe(map(() => this.load()));
  }

  create(postit: PostIt): void {
    const postIts = this.load();
    const localStoragePostIt = new LocalStoragePostIt(new Date().toISOString(), postit.getTitle(), postit.getText(), postit.getColor());
    this.save([localStoragePostIt, ...postIts]);
    this.get$.next();
  }

  remove(postit: PostIt): void {
    const postIts = this.load();
    const data = postIts.filter(x => x.getId() !== postit.getId());
    this.save(data);
    this.get$.next();
  }

  update(postit: PostIt): void {
    const postIts = this.load();
    const localStoragePostIt = new LocalStoragePostIt(postit.getId(), postit.getTitle(), postit.getText(), postit.getColor());
    const data = postIts.map(x => x.getId() === postit.getId() ? localStoragePostIt : x);
    this.save(data);
    this.get$.next();
  }

  private load(): Array<PostIt> {
    const item = localStorage.getItem(this.LS_KEY);

    if (item) {
      const parse: Array<any> = JSON.parse(item);
      return parse.map(x =>
        new LocalStoragePostIt(x.id, x.title, x.text, x.color)
      );
    } else {
      return [];
    }
  }

  private save(data: Array<PostIt>): void {
    localStorage.setItem(this.LS_KEY, JSON.stringify(data));
  }

}
