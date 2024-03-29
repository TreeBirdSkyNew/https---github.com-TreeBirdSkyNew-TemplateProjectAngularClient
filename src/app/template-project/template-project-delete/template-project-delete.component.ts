import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TemplateProjectRepositoryService } from './../../shared/services/templateproject-repository.service';
import { TemplateProjectVM } from '../../_interfaces/TemplateProject/TemplateProjectVM.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-template-project-delete',
  templateUrl: './template-project-delete.component.html',
  styleUrls: ['./template-project-delete.component.css']
})

export class TemplateProjectDeleteComponent implements OnInit {

  templateProject: TemplateProjectVM;
  bsModalRef?: BsModalRef;

  constructor(private repository: TemplateProjectRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) 
    { }

    ngOnInit(): void {
      this.getProjectById();
    }

    private getProjectById = () => {
      const id: string = this.activeRoute.snapshot.params['id'];
      const apiUrl: string = 'api/TemplateProject/ProjectDetails/'+id.toString();
      this.repository.getProject(apiUrl)
      .subscribe({
        next: (own: TemplateProjectVM) => this.templateProject = own,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
    redirectToProjectList = () => {
      this.router.navigate(['/templateProject/list']);
    }

    deleteProject = () => {
      const id: string = this.activeRoute.snapshot.params['id'];
      const apiUrl: string = 'api/TemplateProject/Delete/'+id.toString();
      this.repository.deleteProject(apiUrl)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: `Owner deleted successfully`,
              okButtonText: 'OK'
            }
          };
          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToProjectList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
  }
