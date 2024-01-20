import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

import { TechniquetechniqueItemRepositoryService } from '../../shared/services/techniquetechniqueitem-repository.service';
import { TemplateTechniqueItemVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueItem/TemplateTechniqueItemVM.model';
import { TemplateTechniqueVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueVM.model';

@Component({
  selector: 'app-template-technique-itemdetails',
  templateUrl: './template-technique-itemdetails.component.html',
  styleUrls: ['./template-technique-itemdetails.component.css']
})
export class TemplateTechniqueItemDetailsComponent {

  templateTechniqueItem: TemplateTechniqueItemVM;
  errorMessage: string = '';
  
  constructor(private repository: TechniquetechniqueItemRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  
  ngOnInit() {
    this.getTechniqueItemDetails()
  }
  getTechniqueItemDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string =  `api/TemplateTechnique/TechniqueItemDetails/${id}`;
    this.repository.getTechniqueItem(apiUrl)
    .subscribe({
      next: (own: TemplateTechniqueItemVM) => 
      {
        this.templateTechniqueItem = own
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
}

