import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Org } from '../model/org.model';
import { OrgService } from '../services/org.service';

@Component({
  selector: 'app-orgdetail',
  templateUrl: './orgdetail.component.html',
  styleUrls: ['./orgdetail.component.css']
})
export class OrgdetailComponent implements OnInit, OnDestroy {

  tableColumns = ['Company', 'CEO', 'Description', 'Employees', 'Revenue'];

  tableData: Org[] = [];
  tableDataEventSubscription: Subscription;

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
    this.tableData = this.orgService.getOrgDetail();
    this.tableDataEventSubscription = this.orgService.filteredOrgDetailEvent
    .subscribe(
      (data) => this.tableData = [...data]
    );
  }

  ngOnDestroy(): void {
    this.tableDataEventSubscription.unsubscribe();
  }

}
