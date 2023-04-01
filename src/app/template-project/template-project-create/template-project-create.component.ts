import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TemplateProjectRepositoryService } from './../../shared/services/templateproject-repository.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateProjectVM } from '../../_interfaces/TemplateProjectVM.model';
import { TemplateProjectVMForCreation } from '../../_interfaces/TemplateProjectVMForCreation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-template-project-create',
  templateUrl: './template-project-create.component.html',
  styleUrls: ['./template-project-create.component.css']
})

export class TemplateProjectCreateComponent implements OnInit {
  
  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;
  templateProject: TemplateProjectVM;
  
  constructor(private repository: TemplateProjectRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }
  
  
  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateProjectName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersionNet: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
  }

  validateControl = (controlName: string) => {
    if (this.ownerForm.get(controlName).invalid && this.ownerForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  hasError = (controlName: string, errorName: string) => {
    if (this.ownerForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createProject = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeProjectCreation(ownerFormValue);
  }

  private executeProjectCreation = (ownerFormValue) => {
    const templateProject: TemplateProjectVMForCreation = {
      //templateProjectId: ownerFormValue.templateProjectId,
      templateProjectName: ownerFormValue.templateProjectName,
      templateProjectTitle: ownerFormValue.templateProjectTitle,
      templateProjectDescription: ownerFormValue.templateProjectDescription,
      templateProjectVersion: ownerFormValue.templateProjectVersion,
      templateProjectVersionNet: ownerFormValue.templateProjectVersionNet,
    }
    const apiUrl = 'api/TemplateProject/Create';
    this.repository.createProject(apiUrl, templateProject)
    .subscribe({
      next: (own: TemplateProjectVM) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner: ${own.templateProjectId} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToexecuteProjectCreationList());
      },
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      })
  }

  redirectToexecuteProjectCreationList = () => {
    this.router.navigate(['/templateProject/list']);
  }
}
