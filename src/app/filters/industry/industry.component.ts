import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CheckBox } from 'src/app/model/filter.model';
import { OrgService } from 'src/app/services/org.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.css']
})
export class IndustryComponent implements OnInit {

  industryValues: CheckBox[];
  uncheckEventSubscription: Subscription;

  constructor(private orgService: OrgService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.industryValues = this.orgService.getIndustryValues();
    this.orgService.industryUncheckEvent.subscribe(
      (values) => {
        this.industryValues = values.slice(0,6)
      }
    );
  }

  onChange(event) {
    const industry = event.target.value;
    if(event.target.checked) {
      this.orgService.filterByIndustry(industry);
    }
    else {
      this.orgService.unFilterByIndustry(industry);
    }
  }

  openModal() {
    this.utilService.showModal('Industry');
  }
}
