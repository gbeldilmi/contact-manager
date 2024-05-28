import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { ImportComponent } from './components/import/import.component';
import { ExportComponent } from './components/export/export.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent }, 
  { path: 'details/:id', component: DetailsComponent },
  { path: 'import', component: ImportComponent },
  { path: 'export', component: ExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
