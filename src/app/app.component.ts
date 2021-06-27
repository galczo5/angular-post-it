import {Component, Inject, OnInit} from '@angular/core';
import {PostItService} from "../../projects/angular-post-it/src/lib/post-it.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private readonly postItService: PostItService,
              @Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit() {
    this.document.addEventListener('keydown', ev => {
      if (ev.key === '.') {
        this.openPostIt();
      }

      if (ev.key === 'Escape') {
        this.postItService.hidePostIt();
      }
    });
  }

  openPostIt() {
    this.postItService.showPostIt();
  }
}
