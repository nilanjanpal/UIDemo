import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { Filter } from '../model/filter.model';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-filtered-element',
  templateUrl: './filtered-element.component.html',
  styleUrls: ['./filtered-element.component.css']
})
export class FilteredElementComponent implements OnInit, OnDestroy {

  filteredElements: Filter[] = [];
  filterElementEventSubscription: Subscription;

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
    this.filteredElements = this.orgService.getFilteredElements();
    this.orgService.filteredElementEvent
    .subscribe(
      (elements) => this.filteredElements = [...elements]
    );
  }

  ngOnDestroy(): void {
    this.filterElementEventSubscription.unsubscribe();
  }

  onClick(element) {
    if(element.type == 'product') {
      this.orgService.unFilterByProduct(element.value);
    }
    else {
      this.orgService.unFilterByIndustry(element.value);
    }
  }

}
