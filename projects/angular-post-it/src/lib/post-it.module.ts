import {ModuleWithProviders, NgModule} from '@angular/core';
import {PostItWrapperComponent} from './post-it-wrapper.component';
import {PostItConfig, POST_IT_CONFIG, PostItDefaultConfig} from "./post-it-config";
import {PostItProviderService} from "./post-it-provider.service";
import {PostItComponent} from './post-it.component';
import {CommonModule} from "@angular/common";
import {NullPostItProviderService} from "./null-post-it-provider.service";


@NgModule({
  declarations: [
    PostItWrapperComponent,
    PostItComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PostItWrapperComponent
  ]
})
export class PostItModule {

  static forConfig(config: Partial<PostItConfig>): ModuleWithProviders<PostItModule> {
    return {
      ngModule: PostItModule,
      providers: [
        {provide: POST_IT_CONFIG, useValue: {...PostItDefaultConfig, ...config}},
        {provide: PostItProviderService, useClass: config.provider || NullPostItProviderService}
      ]
    }
  }

}
