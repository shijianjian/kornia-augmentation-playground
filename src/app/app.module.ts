import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule } from '@angular/material';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

import { AppComponent } from './app.component';
import { KorniaCommonModule } from './kornia-common/kornia-common.module';
import { KorniaPlaygroundModule } from "./playground/playground.module";
import { SidebarModule } from "./sidebar/sidebar.module";
import { AugmentationService } from "./augmentation.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyMaterialModule,
    KorniaCommonModule,
    KorniaPlaygroundModule,
    SidebarModule,
  ],
  providers: [
    AugmentationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
