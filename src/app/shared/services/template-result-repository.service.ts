
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TemplateResultVM } from 'src/app/_interfaces/TemplateResult/TemplateResultVM.model';
import { TemplateResultVMForCreation } from 'src/app/_interfaces/TemplateResult/TemplateResultVMForCreation.model';
import { TemplateResultVMForUpdate } from 'src/app/_interfaces/TemplateResult/TemplateResultVMForUpdate.model';


@Injectable({
  providedIn: 'root'
})

export class TemplateResultRepositoryService {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public getResults = (route: string) => {
    return this.http.get<TemplateResultVM[]>(this.createCompleteRoute(route, this.envUrl.urlTemplateResultAddress));
  }
  public getResult = (route: string) => {
    return this.http.get<TemplateResultVM>(this.createCompleteRoute(route, this.envUrl.urlTemplateResultAddress));
  }
  public createResult = (route: string, owner: TemplateResultVMForCreation) => {
    return this.http.post<TemplateResultVMForCreation>(this.createCompleteRoute(route, this.envUrl.urlTemplateResultAddress), owner, this.generateHeaders());
  }
  public updateResult = (route: string, owner: TemplateResultVMForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlTemplateResultAddress), owner, this.generateHeaders());
  }
  public deleteResult = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlTemplateResultAddress));
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}