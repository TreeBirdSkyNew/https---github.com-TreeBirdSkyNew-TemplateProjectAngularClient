import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateFunctionalListComponent } from './template-functional-list/template-functional-list.component';

const routes: Routes = [
  { path:'list', component: TemplateFunctionalListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateFunctionalRoutingModule { }
