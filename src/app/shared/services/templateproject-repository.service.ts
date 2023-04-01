import { TemplateProjectVM } from '../../_interfaces/TemplateProjectVM.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateProjectVMForCreation } from 'src/app/_interfaces/TemplateProjectVMForCreation.model';
import { TemplateProjectVMForUpdate } from 'src/app/_interfaces/TemplateProjectVMForUpdate.Model';


@Injectable({
  providedIn: 'root'
})

export class TemplateProjectRepositoryService {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public getProjects = (route: string) => {
    return this.http.get<TemplateProjectVM[]>(this.createCompleteRoute(route, this.envUrl.urlTemplateProjectAddress));
  }
  public getProject = (route: string) => {
    return this.http.get<TemplateProjectVM>(this.createCompleteRoute(route, this.envUrl.urlTemplateProjectAddress));
  }
  public createProject = (route: string, owner: TemplateProjectVMForCreation) => {
    return this.http.post<TemplateProjectVMForCreation>(this.createCompleteRoute(route, this.envUrl.urlTemplateProjectAddress), owner, this.generateHeaders());
  }
  public updateProject = (route: string, owner: TemplateProjectVMForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlTemplateProjectAddress), owner, this.generateHeaders());
  }
  public deleteProject = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlTemplateProjectAddress));
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