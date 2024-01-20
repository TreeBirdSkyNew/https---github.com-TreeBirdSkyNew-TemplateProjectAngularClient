import { Component, OnInit } from '@angular/core';
import { TemplateProjectVMForUpdate } from './../../_interfaces/TemplateProjectVMForUpdate.Model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TemplateProjectVM } from './../../_interfaces/TemplateProjectVM.model';
import { TemplateProjectRepositoryService } from 'src/app/shared/services/templateproject-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-template-project-update',
  templateUrl: './template-project-update.component.html',
  styleUrls: ['./template-project-update.component.css']
})
export class TemplateProjectUpdateComponent {

  templateProject: TemplateProjectVM;
  ownerForm: FormGroup;
  bsModalRef?:BsModalRef;

  constructor(private repository: TemplateProjectRepositoryService, private errorHandler: ErrorHandlerService, 
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

    ngOnInit(): void {
      this.ownerForm = new FormGroup({
      templateProjectId: new FormControl('', [Validators.required]),
      templateProjectName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectTitle: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectDescription: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersion: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      templateProjectVersionNet: new FormControl('', [Validators.required, Validators.maxLength(60)])
       });
      this.getTemplateProjectById();
    }
    private getTemplateProjectById = () => {
      const id: string = this.activeRoute.snapshot.params['id'];
      const apiUrl: string = 'api/TemplateProject/ProjectDetails/'+id.toString();
  
      this.repository.getProject(apiUrl)
      .subscribe({
        next: (own: TemplateProjectVM) => {
          this.templateProject = { ...own, 
            //dateOfBirth: new Date(this.datePipe.transform(own.dateOfBirth, 'MM/dd/yyyy'))
          };
          this.ownerForm.patchValue(this.templateProject);
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

    public updateProject = (ownerFormValue) => {
      if (this.ownerForm.valid)
        this.executeProjectUpdate(ownerFormValue);
    }

    private executeProjectUpdate = (ownerFormValue) => {
      const projectForUpdate: TemplateProjectVMForUpdate = {
      templateProjectId: ownerFormValue.templateProjectId,
      templateProjectName: ownerFormValue.templateProjectName,
      templateProjectTitle: ownerFormValue.templateProjectTitle,
      templateProjectDescription: ownerFormValue.templateProjectDescription,
      templateProjectVersion: ownerFormValue.templateProjectVersion,
      templateProjectVersionNet: ownerFormValue.templateProjectVersionNet
      }
      const id: string = this.activeRoute.snapshot.params['id'];
      const apiUrl: string = 'api/TemplateProject/Edit/'+id.toString();
      this.repository.updateProject(apiUrl, projectForUpdate)
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
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTemplateProjectList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }

    public redirectToTemplateProjectList = () => {
      this.router.navigate(['/templateProject/list']);
    }
}
