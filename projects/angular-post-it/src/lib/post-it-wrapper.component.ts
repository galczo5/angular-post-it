import {Component, Inject, OnInit} from '@angular/core';
import {PostItProviderService} from "./post-it-provider.service";
import {POST_IT_CONFIG, PostItConfig} from "./post-it-config";
import {PostIt} from "./post-it";

class NewPostIt extends PostIt {
  getId(): string {
    return "";
  }

  getText(): string {
    return "Something to remember";
  }

  getTitle(): string {
    return "Click to edit";
  }

}

@Component({
  selector: 'angular-post-it',
  template: `
    <div class="post-it-backdrop {{postItConfig.css.backdropClass}}">
      <div *ngFor="let col of data; let i = index" class="post-it-column {{postItConfig.css.columnClass}}">

        <post-it *ngFor="let postit of col"
                 [postIt]="postit"
                 (saveClicked)="create($event)"
                 (deleteClicked)="remove(postit)"></post-it>

      </div>
    </div>
  `,
  styles: [`
    .post-it-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vw;
      background: rgba(0, 0, 0, .7);
      display: flex;
    }

    .post-it-column {
      flex: 1 1 0;
      padding: 6px 6px;
    }

    post-it {
      flex-grow: 1;
    }
  `]
})
export class PostItWrapperComponent implements OnInit {

  newPostIt: PostIt = new NewPostIt();
  data: Array<Array<PostIt>> = [];

  constructor(private readonly postItProviderService: PostItProviderService,
              @Inject(POST_IT_CONFIG) readonly postItConfig: PostItConfig) { }

  ngOnInit(): void {

    this.postItProviderService.get()
      .subscribe(value => {

        value = [this.newPostIt, ...value];

        this.data = [];
        for (let i = 0; i < this.postItConfig.cols; i++) {
          this.data.push([]);
        }

        for (let i = 0; i < value.length; i++) {
          this.data[i % this.data.length].push(value[i]);
        }

      });

  }

  create(postIt: PostIt): void {
    if (!postIt.getId()) {
      this.postItProviderService.create(postIt);
    } else {
      this.postItProviderService.update(postIt);
    }
  }

  remove(postIt: PostIt): void {
    this.postItProviderService.remove(postIt);
  }

}
