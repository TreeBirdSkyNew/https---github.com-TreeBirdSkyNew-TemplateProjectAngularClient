import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { EditorModule } from '@tinymce/tinymce-angular';

import { TemplateTechniqueRoutingModule } from './template-technique-routing.module';
import { TemplateTechniqueListComponent } from './template-technique-list/template-technique-list.component';
import { TemplateTechniqueDetailsComponent } from './template-technique-details/template-technique-details.component';
import { TemplateTechniqueCreateComponent } from './template-technique-create/template-technique-create.component';
import { TemplateTechniqueUpdateComponent } from './template-technique-update/template-technique-update.component';
import { TemplateTechniqueDeleteComponent } from './template-technique-delete/template-technique-delete.component';

import { TechniqueItemsComponent } from './template-technique-details/technique-items/technique-items.component';
import { TemplateTechniqueItemDetailsComponent } from './template-technique-itemdetails/template-technique-itemdetails.component';
import { TemplateTechniqueItemupdateComponent } from './template-technique-itemupdate/template-technique-itemupdate.component';
import { TemplateTechniqueItemdeleteComponent } from './template-technique-itemdelete/template-technique-itemdelete.component';
import { TemplateTechniqueItemcreateComponent } from './template-technique-itemcreate/template-technique-itemcreate.component';


@NgModule({
  declarations: [
    TemplateTechniqueListComponent,
    TemplateTechniqueDetailsComponent,
    TechniqueItemsComponent,
    TemplateTechniqueCreateComponent,
    TemplateTechniqueUpdateComponent,
    TemplateTechniqueDeleteComponent,
    TemplateTechniqueItemDetailsComponent,
    TemplateTechniqueItemupdateComponent,
    TemplateTechniqueItemdeleteComponent,
    TemplateTechniqueItemcreateComponent
  ],
  imports: [
    CommonModule,
    TemplateTechniqueRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EditorModule
  ]
})
export class TemplateTechniqueModule { }
