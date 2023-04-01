import { Component , OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

import { TemplateProjectVM } from '../../_interfaces/TemplateProjectVM.model';
import { TemplateProjectRepositoryService } from './../../shared/services/templateproject-repository.service';

@Component({
  selector: 'app-template-project-details',
  templateUrl: './template-project-details.component.html',
  styleUrls: ['./template-project-details.component.css']
})

export class TemplateProjectDetailsComponent implements OnInit {

  templateProject: TemplateProjectVM;
  errorMessage: string = '';

  constructor(private repository: TemplateProjectRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  
  ngOnInit() {
    this.getTemplateProjectDetails()
  }
  
  getTemplateProjectDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = `api/TemplateProject/ProjectDetails?id=${id}`;
    this.repository.getProject(apiUrl)
    .subscribe({
      next: (own: TemplateProjectVM) => this.templateProject = own,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
}