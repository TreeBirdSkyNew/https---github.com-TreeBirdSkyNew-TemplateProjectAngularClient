import { TemplateTechniqueVM } from '../../_interfaces/TemplateTechniqueVM.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateTechniqueVMForCreation } from 'src/app/_interfaces/TemplateTechniqueVMForCreation.model';
import { TemplateTechniqueVMForUpdate } from 'src/app/_interfaces/TemplateTechniqueVMForUpdate.model';


@Injectable({
  providedIn: 'root'
})

export class TemplateTechniqueRepositoryService {
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public getTechniques = (route: string) => {
    return this.http.get<TemplateTechniqueVM[]>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress));
  }
  public getTechnique = (route: string) => {
    return this.http.get<TemplateTechniqueVM>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress));
  }
  public createTechnique = (route: string, owner: TemplateTechniqueVMForCreation) => {
    return this.http.post<TemplateTechniqueVMForCreation>(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress), owner, this.generateHeaders());
  }
  public updateTechnique = (route: string, owner: TemplateTechniqueVMForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlTemplateTechniqueAddress), owner, this.generateHeaders());
  }
  public deleteTechnique = (route: string) => {
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