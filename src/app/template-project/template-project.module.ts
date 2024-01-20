import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateProjectRoutingModule } from './template-project-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { TemplateProjectListComponent } from './template-project-list/template-project-list.component';
import { TemplateProjectDetailsComponent } from './template-project-details/template-project-details.component';
import { TemplateProjectCreateComponent } from './template-project-create/template-project-create.component';
import { TemplateProjectUpdateComponent } from './template-project-update/template-project-update.component';
import { TemplateProjectDeleteComponent } from './template-project-delete/template-project-delete.component';

@NgModule({
  declarations: [
    TemplateProjectListComponent,
    TemplateProjectDetailsComponent,
    TemplateProjectCreateComponent,
    TemplateProjectUpdateComponent,
    TemplateProjectDeleteComponent
  ],
  imports: [
    CommonModule,
    TemplateProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EditorModule
  ]
})
export class TemplateProjectModule { }
