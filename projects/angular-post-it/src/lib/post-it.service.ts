import {ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector} from '@angular/core';
import {PostItWrapperComponent} from "./post-it-wrapper.component";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PostItService {
  private ref: ComponentRef<PostItWrapperComponent> | null = null;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver,
              private readonly injector: Injector,
              @Inject(DOCUMENT) private readonly document: Document) { }

  showPostIt(): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PostItWrapperComponent);
    this.ref = factory.create(this.injector);
    document.body.insertBefore(this.ref.location.nativeElement, document.body.firstChild);
  }

  hidePostIt(): void {
    if (this.ref === null) {
      return;
    }

    (this.ref.location.nativeElement as HTMLElement).remove();
    this.ref.destroy();
    this.ref = null;
  }

}
