import { NgModule }      from '@angular/core';

import { KorniaJsonPipe } from './kornia-json.pipe';

@NgModule({
    imports: [],
    declarations: [
        KorniaJsonPipe
    ],
    exports: [
        KorniaJsonPipe
    ],
})

export class PipesModule {

  static forRoot() {
     return {
         ngModule: PipesModule,
         providers: [],
     };
  }
} 