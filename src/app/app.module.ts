import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';

import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { TemplateProjectRepositoryService } from './shared/services/templateproject-repository.service';

import { TemplateProjectModule } from './template-project/template-project.module';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';

import { DatePipe } from '@angular/common';
import { TemplateTechniqueModule } from './template-technique/template-technique.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    TemplateProjectModule,
    TemplateTechniqueModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
