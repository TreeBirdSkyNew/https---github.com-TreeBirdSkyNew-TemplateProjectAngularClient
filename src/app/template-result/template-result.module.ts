import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TemplateResultRoutingModule } from './template-result-routing.module';
import { TemplateResultListComponent } from './template-result-list/template-result-list.component';
import { TemplateResultCreateComponent } from './template-result-create/template-result-create.component';


@NgModule({
  declarations: [
    TemplateResultListComponent,
    TemplateResultCreateComponent
  ],
  imports: [
    CommonModule,
    TemplateResultRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class TemplateResultModule { }
