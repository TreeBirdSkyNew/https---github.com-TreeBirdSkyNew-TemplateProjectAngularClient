import { Component , OnInit} from '@angular/core';

import { TemplateProjectVM } from '../../_interfaces/TemplateProjectVM.model';
import { TemplateProjectRepositoryService } from './../../shared/services/templateproject-repository.service';

import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-template-project-list',
  templateUrl: './template-project-list.component.html',
  styleUrls: ['./template-project-list.component.css']
})

export class TemplateProjectListComponent implements OnInit {
  
  templateProjects: TemplateProjectVM[];
  errorMessage: string = '';

  constructor(private repository: TemplateProjectRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProjects();
  }
  
  private getAllProjects = () => {
    const apiAddress: string = 'api/TemplateProject/Index';
    this.repository.getProjects(apiAddress)
    .subscribe({
      next: (own: TemplateProjectVM[]) => this.templateProjects = own,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public getTemplateProjectDetails = (id) => { 
    debugger;
    const detailsUrl: string = `/templateProject/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public redirectToUpdatePage = (id) => { 
    const updateUrl: string = `/templateProject/update/${id}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (id) => { 
    const deleteUrl: string = `/templateProject/delete/${id}`; 
    this.router.navigate([deleteUrl]); 
  }

}
