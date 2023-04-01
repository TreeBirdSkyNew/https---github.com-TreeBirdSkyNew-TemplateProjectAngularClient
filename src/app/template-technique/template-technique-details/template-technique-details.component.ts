import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateTechniqueRepositoryService } from '../../shared/services/templatetechnique-repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

import { TemplateTechniqueItemVM } from './../../_interfaces/TemplateTechniqueItemVM.model';
import { TemplateTechniqueVM } from './../../_interfaces/TemplateTechniqueVM.model';

@Component({
  selector: 'app-template-technique-details',
  templateUrl: './template-technique-details.component.html',
  styleUrls: ['./template-technique-details.component.css']
})

export class TemplateTechniqueDetailsComponent {

  templateTechnique: TemplateTechniqueVM;
  errorMessage: string = '';
  
  constructor(private repository: TemplateTechniqueRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  
  ngOnInit() {
    this.getTechniqueDetails()
  }
  getTechniqueDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string =  `api/TemplateTechnique/TechniqueDetails/${id}`;
    this.repository.getTechnique(apiUrl)
    .subscribe({
      next: (own: TemplateTechniqueVM) => 
      {
        this.templateTechnique = own
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
}
