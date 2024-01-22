import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TemplateResultVM } from 'src/app/_interfaces/TemplateResult/TemplateResultVM.model';
import { TemplateResultVMForCreation } from 'src/app/_interfaces/TemplateResult/TemplateResultVMForCreation.model';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TemplateResultRepositoryService } from 'src/app/shared/services/template-result-repository.service';

@Component({
  selector: 'app-template-result-create',
  templateUrl: './template-result-create.component.html',
  styleUrls: ['./template-result-create.component.css']
})

export class TemplateResultCreateComponent implements OnInit {
  
  errorMessage: string = '';
  ownerForm: FormGroup;
  bsModalRef?: BsModalRef;
  templateResult: TemplateResultVM;
  
  constructor(private repository: TemplateResultRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService) { }
  
  
  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateProjectId: new FormControl('', [Validators.required]),
      templateResultName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateResultTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateResultDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateResultVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateResultVersionNet: new FormControl('', [Validators.required, Validators.maxLength(60)])
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

  createResult = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeResultCreation(ownerFormValue);
  }

  private executeResultCreation = (ownerFormValue) => {
    const templateResult: TemplateResultVMForCreation = {
      templateProjectId: ownerFormValue.templateProjectId,
      templateResultName: ownerFormValue.templateResultName,
      templateResultTitle: ownerFormValue.templateResultTitle,
      templateResultDescription: ownerFormValue.templateResultDescription,
      templateResultVersion: ownerFormValue.templateResultVersion,
      templateResultVersionNet: ownerFormValue.templateResultVersionNet,
    }
    const apiUrl = 'api/TemplateResult/Create';
    this.repository.createResult(apiUrl, templateResult)
    .subscribe({
      next: (own: TemplateResultVM) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Owner: ${own.templateResultId} created successfully`,
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToexecuteResultCreationList());
      },
        error: (err: HttpErrorResponse) => {
            this.errorHandler.handleError(err);
            this.errorMessage = this.errorHandler.errorMessage;
        }
      })
  }

  redirectToexecuteResultCreationList = () => {
    this.router.navigate(['/templateResult/list']);
  }
}

