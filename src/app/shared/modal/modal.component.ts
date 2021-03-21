import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CheckBox, ModalData } from 'src/app/model/filter.model';
import { OrgService } from 'src/app/services/org.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  filterList: string[] =[];
  visibility : string;
  checkboxValues: CheckBox[] = [];
  itemType: string;
  modalEventSubscription: Subscription;

  constructor(private utilService: UtilService,
              private orgService: OrgService) { }

  ngOnInit(): void {
    let modalData: ModalData;
    this.visibility = this.utilService.getModalVisibilty();
    if(this.visibility == 'show'){
      modalData = this.utilService.getModalData();
      this.itemType = modalData.itemType;
      this.checkboxValues = modalData.checkbox;
    }
    this.modalEventSubscription = this.utilService.modalVisibilityEvent.subscribe(
      (value) => {
        this.visibility = value;
        if(this.visibility == 'show'){
          console.log(modalData);
          modalData = this.utilService.getModalData();
          this.itemType = modalData.itemType;
          this.checkboxValues = modalData.checkbox;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.modalEventSubscription.unsubscribe();
  }

  onChange(event) {
    const value = event.target.value;
    if(event.target.checked) {
      this.filterList.push(value);
    }
    else {
      this.filterList.filter((filter) => {return filter != value});
    }    
  }

  onModalClose() {
    this.utilService.hideModal();
  }

  onApplyFilters() {
    if(this.filterList.length > 0) {
      if(this.itemType == 'Industry') {
        this.orgService.filterByListofIndustries(this.filterList);
      }
      else {
        this.orgService.filterByListofProducts(this.filterList);
      }
    }
    this.filterList = [];
    this.utilService.hideModal();
  }
}
