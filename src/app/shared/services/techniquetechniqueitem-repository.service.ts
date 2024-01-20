import { TemplateTechniqueItemVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueItem/TemplateTechniqueItemVM.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateTechniqueItemVMForUpdate } from 'src/app/_interfaces/TemlateTechnique/TemplateTechniqueItem/TemplateTechniqueItemVMForUpdate.model';
import { TemplateTechniqueItemVMForCreation } from 'src/app/_interfaces/TemlateTechnique/TemplateTechniqueItem/TemplateTechniqueItemVMForCreation.model';


@Injectable({
  providedIn: 'root'
})

export class TechniquetechniqueItemRepositoryService {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public getTechniqueItems = (route: string) => {
    return this.http.get<TemplateTechniqueItemVM[]>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress));
  }
  public getTechniqueItem = (route: string) => {
    return this.http.get<TemplateTechniqueItemVM>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress));
  }
  public createTechniqueItem = (route: string, owner: TemplateTechniqueItemVMForCreation) => {
    return this.http.post<TemplateTechniqueItemVMForCreation>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress), owner, this.generateHeaders());
  }
  public updateTechniqueItem = (route: string, owner: TemplateTechniqueItemVMForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress), owner, this.generateHeaders());
  }
  public deleteTechniqueItem = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress));
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