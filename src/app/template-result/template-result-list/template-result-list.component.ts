import { Component } from '@angular/core';
import { TemplateResultVM } from 'src/app/_interfaces/TemplateResult/TemplateResultVM.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TemplateResultRepositoryService } from 'src/app/shared/services/template-result-repository.service';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-template-result-list',
  templateUrl: './template-result-list.component.html',
  styleUrls: ['./template-result-list.component.css']
})
export class TemplateResultListComponent {

  templateResults: TemplateResultVM[];

  constructor(private repository: TemplateResultRepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router)
    { }

    ngOnInit(): void {
      this.getAllResults();
    }

    private getAllResults = () => {
      const apiAddress: string = 'api/TemplateResult/Index';
      this.repository.getResults(apiAddress)
      .subscribe(results => {
        this.templateResults = results;
      })
    }
}
