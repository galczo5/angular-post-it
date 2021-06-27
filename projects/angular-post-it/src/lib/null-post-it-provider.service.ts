import {PostItProviderService} from "./post-it-provider.service";
import {PostIt} from "./post-it";
import {Observable} from "rxjs";

export class NullPostItProviderService extends PostItProviderService {
  create(postit: PostIt): void {
    throw new Error('PostItProviderService not provided. Provide it with PostItModule.forConfig()');
  }

  get(): Observable<Array<PostIt>> {
    throw new Error('PostItProviderService not provided. Provide it with PostItModule.forConfig()');
  }

  remove(postit: PostIt): void {
    throw new Error('PostItProviderService not provided. Provide it with PostItModule.forConfig()');
  }

  update(postit: PostIt): void {
    throw new Error('PostItProviderService not provided. Provide it with PostItModule.forConfig()');
  }
}
