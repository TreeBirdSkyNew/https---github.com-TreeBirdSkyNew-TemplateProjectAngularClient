import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  urlTemplateProjectAddress: string = environment.urlTemplateProjectAddress;
  urlTemplateTechniqueAddress: string = environment.urlTemplateTechniqueAddress;
  constructor() { }
}