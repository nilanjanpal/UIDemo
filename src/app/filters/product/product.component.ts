import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckBox } from 'src/app/model/filter.model';
import { OrgService } from 'src/app/services/org.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productValues: CheckBox[];

  constructor(private orgService: OrgService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.productValues = this.orgService.getProductValues();
    this.orgService.productUncheckEvent.subscribe(
      (values) => {
        this.productValues = values.slice(0,6);
      }
    );
  }

  onChange(event) {
    const product = event.target.value;
    if(event.target.checked) {
      this.orgService.filterByProduct(product);
    }
    else {
      this.orgService.unFilterByProduct(product);
    }
  }

  openModal() {
    this.utilService.showModal('Product');
  }
}
