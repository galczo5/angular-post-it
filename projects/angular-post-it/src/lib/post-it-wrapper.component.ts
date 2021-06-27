import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {PostItProviderService} from "./post-it-provider.service";
import {POST_IT_CONFIG, PostItConfig} from "./post-it-config";
import {PostIt} from "./post-it";
import Fuse from 'fuse.js'

class NewPostIt extends PostIt {

  constructor(private readonly title: string,
              private readonly text: string) {
    super();
  }

  getId(): string {
    return "";
  }

  getText(): string {
    return this.text;
  }

  getTitle(): string {
    return this.title;
  }

}

@Component({
  selector: 'angular-post-it',
  template: `
    <div class="post-it-backdrop {{postItConfig.css.backdropClass}}">
      <div class="post-it-search">
        <input #search
               type="text"
               [placeholder]="postItConfig.labels.searchPlaceholder"
               (keyup)="setFilteredData(search.value)">
      </div>
      <div class="post-it-columns">
        <div *ngFor="let col of data; let i = index" class="post-it-column {{postItConfig.css.columnClass}}">

          <post-it *ngFor="let postit of col"
                   [postIt]="postit"
                   (saveClicked)="create($event)"
                   (deleteClicked)="remove(postit)"></post-it>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .post-it-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: auto;
      background: rgba(0, 0, 0, .85);
      display: flex;
      flex-direction: column;
    }

    .post-it-search {
      height: 50px;
      padding: 6px;
      margin: 12px 0;
    }

    .post-it-search input {
      width: 100%;
      height: 100%;
      background: none;
      border: none;
      outline: none;
      font-size: 25px;
      color: #FFFFFF;
    }

    .post-it-columns {
      display: flex;
      flex-grow: 1;
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

  newPostIt: PostIt;
  data: Array<Array<PostIt>> = [];

  private postIts: Array<PostIt> = [];
  private filter: string = '';

  constructor(private readonly postItProviderService: PostItProviderService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              @Inject(POST_IT_CONFIG) readonly postItConfig: PostItConfig) {
    this.newPostIt = new NewPostIt(postItConfig.labels.newCardTitle, postItConfig.labels.newCardText);
  }

  ngOnInit(): void {

    this.postItProviderService.get()
      .subscribe(value => {
        this.postIts = value;
        this.setFilteredData(this.filter);
        this.changeDetectorRef.detectChanges();
      });

  }

  private partitionData(value: Array<PostIt>) {
    this.data = [];
    for (let i = 0; i < this.postItConfig.cols; i++) {
      this.data.push([]);
    }

    for (let i = 0; i < value.length; i++) {
      this.data[i % this.data.length].push(value[i]);
    }
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

  setFilteredData(filter: string): void {
    this.filter = filter;
    if (!filter) {
      this.partitionData([this.newPostIt, ...this.postIts]);
      this.changeDetectorRef.detectChanges();
      return;
    }

    const mappedData = this.postIts.map(x => ({id: x.getId(), title: x.getTitle(), text: x.getText()}));
    const fuse = new Fuse(mappedData, {
      isCaseSensitive: false,
      distance: 30,
      threshold: .5,
      keys: ['title', 'text']
    });

    const ids = fuse.search(filter).map(x => x.item.id);
    const filteredData = this.postIts.filter(x => ids.includes(x.getId()));

    this.partitionData([this.newPostIt, ...filteredData]);
    this.changeDetectorRef.detectChanges();
  }

}
