import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { ImportComponent } from './components/import/import.component';
import { ExportComponent } from './components/export/export.component';

import { ManagerService } from './services/manager.service';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    ListComponent,
    ImportComponent,
    ExportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    ManagerService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
