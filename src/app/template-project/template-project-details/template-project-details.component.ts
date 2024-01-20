import { Component , OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  projectDetailsForm: FormGroup;

  constructor(private repository: TemplateProjectRepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }
  
  ngOnInit() {
    this.getTemplateProjectDetails()
  }
  
  getTemplateProjectDetails = () => {
    const id: string = this.activeRoute.snapshot.params['id'];
    const apiUrl: string = 'api/TemplateProject/ProjectDetails/'+id.toString();
    this.repository.getProject(apiUrl)
    .subscribe({
      next: (own: TemplateProjectVM) => this.templateProject = own,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
    this.projectDetailsForm = new FormGroup({
      templateProjectName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersionNet: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }
}