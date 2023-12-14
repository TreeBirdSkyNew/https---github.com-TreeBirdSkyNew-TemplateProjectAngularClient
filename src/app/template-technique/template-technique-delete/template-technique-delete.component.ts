import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TemplateTechniqueRepositoryService } from './../../shared/services/templatetechnique-repository.service';
import { TemplateTechniqueVM } from '../../_interfaces/TemlateTechnique/TemplateTechniqueVM.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-template-technique-delete',
  templateUrl: './template-technique-delete.component.html',
  styleUrls: ['./template-technique-delete.component.css']
})
export class TemplateTechniqueDeleteComponent {

  templateTechnique: TemplateTechniqueVM;
  bsModalRef?: BsModalRef;

  constructor(private repository: TemplateTechniqueRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) 
    { }

    ngOnInit(): void {
      this.getTechniqueById();
    }

    private getTechniqueById = () => {
      const ownerId: string = this.activeRoute.snapshot.params['id'];
      const apiUri: string = `api/TemplateTechnique/TechniqueDetails/${ownerId}`;
      this.repository.getTechnique(apiUri)
      .subscribe({
        next: (own: TemplateTechniqueVM) => this.templateTechnique = own,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
    redirectToTechniqueList = () => {
      this.router.navigate(['/templateTechnique/list']);
    }

    deleteTechnique = () => {
      const deleteUri: string = `api/templateTechnique/DeleteTechnique/${this.templateTechnique.templateTechniqueId}`;
      this.repository.deleteTechnique(deleteUri)
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
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToTechniqueList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
  }

