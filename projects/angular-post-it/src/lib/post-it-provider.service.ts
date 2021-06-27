import {PostIt} from "./post-it";
import {Observable} from "rxjs";

export abstract class PostItProviderService {

  abstract get(): Observable<Array<PostIt>>;
  abstract create(postit: PostIt): void;
  abstract remove(postit: PostIt): void;
  abstract update(postit: PostIt): void;

}
