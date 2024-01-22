import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateResultListComponent } from './template-result-list/template-result-list.component';
import { TemplateResultCreateComponent } from './template-result-create/template-result-create.component';

const routes: Routes = [
  { path:'list', component: TemplateResultListComponent },
  { path:'create', component: TemplateResultCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateResultRoutingModule { }
