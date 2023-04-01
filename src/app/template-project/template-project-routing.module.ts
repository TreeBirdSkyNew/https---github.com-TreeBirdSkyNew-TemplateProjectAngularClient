import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateProjectListComponent } from './template-project-list/template-project-list.component';
import { TemplateProjectDetailsComponent } from './template-project-details/template-project-details.component';
import { TemplateProjectCreateComponent } from './template-project-create/template-project-create.component';
import { TemplateProjectUpdateComponent } from './template-project-update/template-project-update.component';
import { TemplateProjectDeleteComponent } from './template-project-delete/template-project-delete.component';

const routes: Routes = [
  { path:'list', component: TemplateProjectListComponent },
  { path: 'details/:id', component: TemplateProjectDetailsComponent },
  { path: 'create', component: TemplateProjectCreateComponent },
  { path: 'update/:id', component: TemplateProjectUpdateComponent },
  { path: 'delete/:id', component: TemplateProjectDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateProjectRoutingModule { }
