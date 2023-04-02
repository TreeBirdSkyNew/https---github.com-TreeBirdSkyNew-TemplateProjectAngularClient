import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TechniquetechniqueItemRepositoryService } from './../../shared/services/techniquetechniqueitem-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateTechniqueItemVM } from 'src/app/_interfaces/TemplateTechniqueItemVM.model';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateTechniqueItemVMForCreation } from 'src/app/_interfaces/TemplateTechniqueItemVMForCreation.model';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-template-technique-itemcreate',
  templateUrl: './template-technique-itemcreate.component.html',
  styleUrls: ['./template-technique-itemcreate.component.css']
})
export class TemplateTechniqueItemcreateComponent {

  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;
  templateTechniqueItem: TemplateTechniqueItemVM;
  
  constructor(private repository: TechniquetechniqueItemRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }
  
    ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateTechniqueId: new FormControl('', [Validators.required]),    
      templateProjectId: new FormControl('', [Validators.required]),    
      templateTechniqueItemName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemVersionNET: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueInitialFile: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueFinalContent: new FormControl('', [Validators.required, Validators.maxLength(60)]),
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

  createTechniqueItem = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeTechniqueItemCreation(ownerFormValue);
  }

  private executeTechniqueItemCreation = (ownerFormValue) => {
    const templateTechniqueItem: TemplateTechniqueItemVMForCreation = {
    templateTechniqueId: ownerFormValue.templateTechniqueId,
    templateProjectId: ownerFormValue.templateProjectId,
    templateTechniqueItemName: ownerFormValue.templateTechniqueItemName,
    templateTechniqueItemTitle: ownerFormValue.templateTechniqueItemTitle,
    templateTechniqueItemDescription: ownerFormValue.templateTechniqueItemDescription,
    templateTechniqueItemVersion: ownerFormValue.templateTechniqueItemVersion,
    templateTechniqueItemVersionNET: ownerFormValue.templateTechniqueItemVersionNET,
    templateTechniqueInitialFile: ownerFormValue.templateTechniqueInitialFile,
    templateTechniqueFinalContent: ownerFormValue.templateTechniqueFinalContent
    }
    const apiUrl = 'api/TemplateTechnique/CreateTechniqueItem';
    this.repository.createTechniqueItem(apiUrl, templateTechniqueItem)
    .subscribe({
      next: (own: TemplateTechniqueItemVM) => {
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

