import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PostItModule} from "../../projects/angular-post-it/src/lib/post-it.module";
import {LocalStoragePostItProviderService} from "../../projects/angular-post-it/src/lib/local-storage-post-it-provider.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostItModule.forConfig({
      provider: LocalStoragePostItProviderService,
      cols: 4,
      colors: ['orange', 'lightblue', 'coral', 'blue', 'red']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
