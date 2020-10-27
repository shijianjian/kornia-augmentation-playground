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

export class KorniaPipesModule {

  static forRoot() {
     return {
         ngModule: KorniaPipesModule,
         providers: [],
     };
  }
} 