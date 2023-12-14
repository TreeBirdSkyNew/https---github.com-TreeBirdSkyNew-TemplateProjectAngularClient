import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

import { TemplateTechniqueVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueVM.model';
import { TemplateTechniqueVMForUpdate } from '../../_interfaces/TemlateTechnique/TemplateTechniqueVMForUpdate.model';
import { TemplateTechniqueRepositoryService } from 'src/app/shared/services/templatetechnique-repository.service';

@Component({
  selector: 'app-template-technique-update',
  templateUrl: './template-technique-update.component.html',
  styleUrls: ['./template-technique-update.component.css']
})
export class TemplateTechniqueUpdateComponent {

  templateTechnique: TemplateTechniqueVM;
  ownerForm: FormGroup;
  bsModalRef?:BsModalRef;
  
  constructor(private repository: TemplateTechniqueRepositoryService, private errorHandler: ErrorHandlerService, 
  private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
  private modal: BsModalService) { }

  ngOnInit(): void {
    this.ownerForm = new FormGroup({
      templateTechniqueName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateTechniqueVersionNET: new FormControl('', [Validators.required, Validators.maxLength(60)])
    });
    this.getTechniqueById();
  }
  private getTechniqueById = () => {
    const ownerId: string = this.activeRoute.snapshot.params['id'];
    const ownerByIdUri: string =  `api/TemplateTechnique/TechniqueDetails/${ownerId}`;
    this.repository.getTechnique(ownerByIdUri)
    .subscribe({
      next: (own: TemplateTechniqueVM) => {
        this.templateTechnique = { ...own, 
          
        };
        this.ownerForm.patchValue(this.templateTechnique);
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

  public updateTechnique = (ownerFormValue) => {
    if (this.ownerForm.valid)
      this.executeTechniqueUpdate(ownerFormValue);
  }

  private executeTechniqueUpdate = (ownerFormValue) => {
    const ownerForUpd: TemplateTechniqueVMForUpdate = {
    templateTechniqueName: ownerFormValue.templateTechniqueName,
    templateTechniqueTitle: ownerFormValue.templateTechniqueTitle,
    templateTechniqueDescription: ownerFormValue.templateTechniqueDescription,
    templateTechniqueVersion: ownerFormValue.templateTechniqueVersion,
    templateTechniqueVersionNET: ownerFormValue.templateTechniqueVersionNET
    }
    const apiUri: string = `api/TemplateTechnique/EditTechnique/${this.templateTechnique.templateTechniqueId}`;
    this.repository.updateTechnique(apiUri, ownerForUpd)
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
