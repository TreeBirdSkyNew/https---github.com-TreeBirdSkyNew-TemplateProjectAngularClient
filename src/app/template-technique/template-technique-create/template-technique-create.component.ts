import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TemplateTechniqueRepositoryService } from './../../shared/services/templatetechnique-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateTechniqueVM } from 'src/app/_interfaces/TemplateTechniqueVM.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateTechniqueVMForCreation } from 'src/app/_interfaces/TemplateTechniqueVMForCreation.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-template-technique-create',
  templateUrl: './template-technique-create.component.html',
  styleUrls: ['./template-technique-create.component.css']
})
export class TemplateTechniqueCreateComponent {

  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;
  templateTechnique: TemplateTechniqueVM;
  
  constructor(private repository: TemplateTechniqueRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }
  
    ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateProjectId: new FormControl('', [Validators.required]),
      templateTechniqueName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueVersionNET: new FormControl('', [Validators.required, Validators.maxLength(60)])
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

  createTechnique = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeTechniqueCreation(ownerFormValue);
  }

  private executeTechniqueCreation = (ownerFormValue) => {
    const templateTechnique: TemplateTechniqueVMForCreation = {
      templateProjectId: ownerFormValue.templateProjectId,
      templateTechniqueName: ownerFormValue.templateTechniqueName,
      templateTechniqueTitle: ownerFormValue.templateTechniqueTitle,
      templateTechniqueDescription: ownerFormValue.templateTechniqueDescription,
      templateTechniqueVersion: ownerFormValue.templateTechniqueVersion,
      templateTechniqueVersionNET: ownerFormValue.templateTechniqueVersionNET,
    }
    const apiUrl = 'api/TemplateTechnique/CreateTechnique';
    this.repository.createTechnique(apiUrl, templateTechnique)
    .subscribe({
      next: (own: TemplateTechniqueVM) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner: ${own.templateTechniqueId} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTechniqueList());
      },
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      })
  }

  redirectToTechniqueList = () => {
    this.router.navigate(['/templateTechnique/list']);
  }
}
