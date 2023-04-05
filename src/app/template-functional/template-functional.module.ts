import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateFunctionalRoutingModule } from './template-functional-routing.module';
import { TemplateFunctionalListComponent } from './template-functional-list/template-functional-list.component';


@NgModule({
  declarations: [
    TemplateFunctionalListComponent
  ],
  imports: [
    CommonModule,
    TemplateFunctionalRoutingModule
  ]
})
export class TemplateFunctionalModule { }
