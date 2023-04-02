import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TechniquetechniqueItemRepositoryService } from './../../shared/services/techniquetechniqueitem-repository.service';
import { TemplateTechniqueItemVM } from './../../_interfaces/TemplateTechniqueItemVM.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';


@Component({
  selector: 'app-template-technique-itemdelete',
  templateUrl: './template-technique-itemdelete.component.html',
  styleUrls: ['./template-technique-itemdelete.component.css']
})
export class TemplateTechniqueItemdeleteComponent {

  templateTechniqueItem: TemplateTechniqueItemVM;
  bsModalRef?: BsModalRef;

  constructor(private repository: TechniquetechniqueItemRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) 
    { }

    ngOnInit(): void {
      this.getTechniqueIemById();
    }

    private getTechniqueIemById = () => {
      const ownerId: string = this.activeRoute.snapshot.params['id'];
      const apiUri: string = `api/TemplateTechnique/TechniqueItemDetails/${ownerId}`;
      this.repository.getTechniqueItem(apiUri)
      .subscribe({
        next: (own: TemplateTechniqueItemVM) => this.templateTechniqueItem = own,
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }
    redirectToTechniqueList = () => {
      this.router.navigate(['/templateTechnique/list']);
    }

    deleteTechniqueItem = () => {
      const deleteUri: string = `api/templateTechnique/DeleteTechniqueItem/${this.templateTechniqueItem.templateTechniqueItemId}`;
      this.repository.deleteTechniqueItem(deleteUri)
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


