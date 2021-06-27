import {ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {PostIt} from "./post-it";
import {POST_IT_CONFIG, PostItConfig} from "./post-it-config";

@Component({
  selector: 'post-it',
  template: `
    <div *ngIf="postIt">
      <div class="post-it {{postItConfig.css.postitClass}}"
           [style.background]="postIt.getColor()">

        <div #title
             class="post-it-title"
             contenteditable="true"
             (click)="enterEditMode()">{{ postIt.getTitle() }}</div>

        <div #text
             class="post-it-text"
             contenteditable="true"
             (click)="enterEditMode()">{{ postIt.getText() }}</div>

        <div *ngIf="editModeEnabled()" class="post-it-footer">
          <button *ngIf="postIt.getId()" (click)="remove(postIt.getId())">Delete</button>
          <button (click)="save(postIt.getId(), title.innerText, text.innerText, postIt.getColor())">Save</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .post-it {
      border-radius: 4px;
      color: #333333;
      min-height: 200px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }

    .post-it-title {
      font-size: 24px;
      margin-bottom: 12px;
    }

    .post-it-text {
      flex-grow: 1;
    }

    .post-it-footer {
      text-align: right;
      margin-top: 12px;
    }

    .post-it-footer button {
      background: rgba(255, 255, 255, .5);
      border: none;
      outline: none;
      border-radius: 4px;
      margin-left: 4px;
      padding: 6px 12px;
    }
  `]
})
export class PostItComponent {

  @Input()
  postIt?: PostIt;

  @Output()
  saveClicked: EventEmitter<PostIt> = new EventEmitter<PostIt>();

  @Output()
  deleteClicked: EventEmitter<string> = new EventEmitter<string>();

  private editMode: boolean = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              @Inject(POST_IT_CONFIG) readonly postItConfig: PostItConfig) {
  }

  save(id: string, title: string, text: string, color: string): void {
    this.saveClicked.emit({
      getId(): string {
        return id;
      },
      getText(): string {
        return text;
      },
      getTitle(): string {
        return title;
      },
      getColor(): string {
        return color;
      }
    })
  }

  remove(id: string): void {
    this.deleteClicked.emit(id);
  }

  enterEditMode(): void {
    this.editMode = true;
    this.changeDetectorRef.detectChanges();
  }

  editModeEnabled(): boolean {
    return this.editMode || !this.postIt?.getId();
  }

}
