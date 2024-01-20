import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TemplateTechniqueItemVM } from './../../../_interfaces/TemplateTechniqueItemVM.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-technique-items',
  templateUrl: './technique-items.component.html',
  styleUrls: ['./technique-items.component.css']
})
export class TechniqueItemsComponent implements OnInit {

  @Input() listeTechniqueItem: TemplateTechniqueItemVM[];
  
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public getTechniqueItemDetails = (id) => { 
    const detailsUrl: string = `/templateTechnique/itemdetails/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public getTechniqueItemUpdate = (id) => { 
    const detailsUrl: string = `/templateTechnique/itemupdate/${id}`; 
    this.router.navigate([detailsUrl]); 
  }

  public getTechniqueItemDelete = (id) => { 
    const detailsUrl: string = `/templateTechnique/itemdelete/${id}`; 
    this.router.navigate([detailsUrl]); 
  }
  public getTechniqueItemCreate = () => { 
    const id: string = this.activeRoute.snapshot.params['id'];
    const detailsUrl: string = `/templateTechnique/itemcreate/${id}`; 
    this.router.navigate([detailsUrl]); 
  }
  

}
