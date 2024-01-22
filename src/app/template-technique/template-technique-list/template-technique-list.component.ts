import { Component } from '@angular/core';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { TemplateTechniqueVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueVM.model';
import { TemplateTechniqueRepositoryService } from '../../shared/services/templatetechnique-repository.service';


@Component({
  selector: 'app-template-technique-list',
  templateUrl: './template-technique-list.component.html',
  styleUrls: ['./template-technique-list.component.css']
})
export class TemplateTechniqueListComponent {
  
  templateTechniques: TemplateTechniqueVM[];
  
  constructor(private repository: TemplateTechniqueRepositoryService, 
    private errorHandler: ErrorHandlerService,
    private router: Router) 
    { }
  
  ngOnInit(): void {
    this.getAlltemplateTechniques();
  }
  
  private getAlltemplateTechniques = () => {
    const apiAddress: string = 'api/TemplateTechnique/Index';
    this.repository.getTechniques(apiAddress)
    .subscribe(technique => {
      this.templateTechniques = technique;
    })
  }

  public getTechniqueDetails = (id) => { 
    const detailsUrl: string = `/templateTechnique/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/templateTechnique/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/templateTechnique/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }

}