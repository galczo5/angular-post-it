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

        <div class="post-it-footer">
          <div>
            <div *ngIf="postIt.getId() && postItConfig.colors.length" class="post-it-color-wrapper">
              <div *ngFor="let color of postItConfig.colors"
                   class="post-it-color"
                   [style.background]="color"
                   (click)="save(postIt.getId(), postIt.getTitle(), postIt.getText(), color)"></div>
            </div>
          </div>
          <div>
            <button *ngIf="postIt.getId()"
                    (click)="remove(postIt.getId())">
              {{ postItConfig.labels.deleteButton }}
            </button>
            <button *ngIf="editModeEnabled()"
                    (click)="save(postIt.getId(), title.innerText, text.innerText, postIt.getColor())">
              {{ postItConfig.labels.saveButton }}
            </button>
          </div>
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
      display: flex;
      justify-content: space-between;
      align-items: center;
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

    .post-it-color-wrapper {
      display: flex;
    }

    .post-it-color {
      border: 1px solid #333333;
      height: 20px;
      width: 20px;
      margin-right: 4px;
      border-radius: 4px;
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
