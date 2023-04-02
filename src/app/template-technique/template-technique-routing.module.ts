import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateTechniqueListComponent } from './template-technique-list/template-technique-list.component';
import { TemplateTechniqueDetailsComponent } from './template-technique-details/template-technique-details.component';
import { TemplateTechniqueCreateComponent } from './template-technique-create/template-technique-create.component';
import { TemplateTechniqueUpdateComponent } from './template-technique-update/template-technique-update.component';
import { TemplateTechniqueDeleteComponent } from './template-technique-delete/template-technique-delete.component';

import { TemplateTechniqueItemDetailsComponent } from './template-technique-itemdetails/template-technique-itemdetails.component';
import { TemplateTechniqueItemupdateComponent } from './template-technique-itemupdate/template-technique-itemupdate.component';
import { TemplateTechniqueItemdeleteComponent } from './template-technique-itemdelete/template-technique-itemdelete.component';
import { TemplateTechniqueItemcreateComponent } from './template-technique-itemcreate/template-technique-itemcreate.component';


const routes: Routes = [
  { path:'list', component: TemplateTechniqueListComponent },
  { path: 'details/:id', component: TemplateTechniqueDetailsComponent },
  { path: 'create', component: TemplateTechniqueCreateComponent },
  { path: 'update/:id', component: TemplateTechniqueUpdateComponent },
  { path: 'delete/:id', component: TemplateTechniqueDeleteComponent },
  { path: 'itemdetails/:id', component: TemplateTechniqueItemDetailsComponent },
  { path: 'itemcreate', component: TemplateTechniqueItemcreateComponent },
  { path: 'itemupdate/:id', component: TemplateTechniqueItemupdateComponent },
  { path: 'itemdelete/:id', component: TemplateTechniqueItemdeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateTechniqueRoutingModule { }
