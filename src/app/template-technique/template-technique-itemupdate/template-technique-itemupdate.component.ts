import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

import { TemplateTechniqueItemVM } from './../../_interfaces/TemplateTechniqueItemVM.model';
import { TemplateTechniqueItemVMForUpdate } from './../../_interfaces/TemplateTechniqueItemVMForUpdate.model';
import { TechniquetechniqueItemRepositoryService } from 'src/app/shared/services/techniquetechniqueitem-repository.service';


@Component({
  selector: 'app-template-technique-itemupdate',
  templateUrl: './template-technique-itemupdate.component.html',
  styleUrls: ['./template-technique-itemupdate.component.css']
})
export class TemplateTechniqueItemupdateComponent {

  templateTechniqueItem: TemplateTechniqueItemVM;
  ownerForm: FormGroup;
  bsModalRef?:BsModalRef;
  
  constructor(private repository: TechniquetechniqueItemRepositoryService, private errorHandler: ErrorHandlerService, 
  private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
  private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateTechniqueId: new FormControl('', [Validators.required]),      
      templateTechniqueItemName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueItemVersionNET: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueInitialFile: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueFinalContent: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
    this.getTechniqueById();
  }
  private getTechniqueById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const ownerByIdUri: string =  `api/TemplateTechnique/TechniqueItemDetails/${ownerId}`;
    this.repository.getTechniqueItem(ownerByIdUri)
    .subscribe({
      next: (own: TemplateTechniqueItemVM) => {
        this.templateTechniqueItem = { ...own, 
          
        };
        this.ownerForm.patchValue(this.templateTechniqueItem);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
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

  public updateTechniqueItem = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeTechniqueUpdate(ownerFormValue);
  }

  private executeTechniqueUpdate = (ownerFormValue) => {
    const ownerForUpd: TemplateTechniqueItemVMForUpdate = {
    templateTechniqueId: ownerFormValue.templateTechniqueId,
    templateTechniqueItemName: ownerFormValue.templateTechniqueItemName,
    templateTechniqueItemTitle: ownerFormValue.templateTechniqueItemTitle,
    templateTechniqueItemDescription: ownerFormValue.templateTechniqueItemDescription,
    templateTechniqueItemVersion: ownerFormValue.templateTechniqueItemVersion,
    templateTechniqueItemVersionNET: ownerFormValue.templateTechniqueItemVersionNET,
    templateTechniqueInitialFile: ownerFormValue.templateTechniqueInitialFile,
    templateTechniqueFinalContent: ownerFormValue.templateTechniqueFinalContent
    }
    const apiUri: string = `api/TemplateTechnique/EditTechniqueItem/${this.templateTechniqueItem.templateTechniqueItemId}`;
    this.repository.updateTechniqueItem(apiUri, ownerForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Owner updated successfully',
            okButtonText: 'OK'
          }
        };
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTemplateTechniqueList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToTemplateTechniqueList = () => {
    this.router.navigate(['/templateTechnique/list']);
  }
}

