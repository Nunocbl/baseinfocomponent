import { ModalComponent } from './modal/modal.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseinfoComponent } from './baseinfo/baseinfo.component';
import { EditablefieldComponent } from './editablefield/editablefield.component';
import { FancySelect } from './fancy-select/fancy-select.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseinfoComponent,
    EditablefieldComponent,
    FancySelect,
    ModalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
