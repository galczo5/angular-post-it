import {PostItProviderService} from "./post-it-provider.service";
import {InjectionToken, Type} from "@angular/core";
import {NullPostItProviderService} from "./null-post-it-provider.service";

export interface PostItCssConfig {
  backdropClass: string;
  columnClass: string;
  postitClass: string;
}

export interface PostItConfig {
  css: PostItCssConfig;
  colors: Array<string>;
  provider: Type<PostItProviderService>;
  cols: number;
}

export const PostItDefaultConfig: Partial<PostItConfig> = {
  cols: 4,
  css: {
    backdropClass: '',
    columnClass: '',
    postitClass: ''
  },
  colors: [],
  provider: NullPostItProviderService
};

export const POST_IT_CONFIG = new InjectionToken('POST_IT_CONFIG');
