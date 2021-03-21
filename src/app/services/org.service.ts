import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { CheckBox, Filter } from "../model/filter.model";
import { Org } from "../model/org.model";

@Injectable({
    providedIn: 'root'
})
export class OrgService {

    private filteredElements: Filter[] = [];
    private industryFilters: string[] = [];
    private productFilters: string[] = [];
    private filteredOrgDetail: Org[] = [];
    filteredElementEvent = new Subject<Filter[]>();
    filteredOrgDetailEvent = new Subject<Org[]>();
    productUncheckEvent = new Subject<CheckBox[]>();
    industryUncheckEvent = new Subject<CheckBox[]>();

    private industryValues = [
      { isChecked: false, value: 'Radiators, Steering Columns'},
      { isChecked: false, value: 'Other Business Activities'},
      { isChecked: false, value: 'Motor Vehicle Parts'},
      { isChecked: false, value: 'Petrol Gas Filling Station'},
      { isChecked: false, value: 'CNG Gas Filling Station'},
      { isChecked: false, value: 'Pre-owned Car Dealers'},
      { isChecked: false, value: 'New Car Dealers'},
      { isChecked: false, value: 'Car Rental Services'},
      { isChecked: false, value: 'Two Wheeler Dealers'}
    ];

    private productValues = [
      { isChecked: false, value: 'Seat covers'},
      { isChecked: false, value: 'Commercial vehicle tyres'},
      { isChecked: false, value: 'Two Wheeler Accessories'},
      { isChecked: false, value: 'Power Inverter'},
      { isChecked: false, value: 'Car Exteriors'},
      { isChecked: false, value: 'Car Interiors'},
      { isChecked: false, value: 'Dashboard Accessories'},
      { isChecked: false, value: 'Bike Riding Gear'},
      { isChecked: false, value: 'Car Lighting'},
      { isChecked: false, value: 'Car Care'},
      { isChecked: false, value: 'Car Styling'},
    ]

    private orgDetail: Org[] = [
      {
        company: 'Company 1',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Radiators, Steering Columns'],
        product: ['Seat covers']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Radiators, Steering Columns', 'Other Business Activities'],
        product: ['Two Wheeler Accessories']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Motor Vehicle Parts', ' Petrol Gas Filling Station'],
        product: ['Commercial vehicle tyres']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Petrol Gas Filling Station'],
        product: ['Power Inverter', 'Car Accessories']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Petrol Gas Filling Station'],
        product: ['Power Inverter', 'Car Accessories']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Petrol Gas Filling Station'],
        product: ['Power Inverter', 'Car Accessories']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Petrol Gas Filling Station'],
        product: ['Power Inverter', 'Car Accessories']
      },
      {
        company: 'Company',
        ceo: 'Lorem Ipsium',
        description: 'Lorem Ipsium Dolor Sit Amet, Consectetur Adisipisfwcing Elit, Set Do Eiusmod Tempor Incididunt',
        employees: '200+',
        revenue: 594093.48,
        industry: ['Petrol Gas Filling Station'],
        product: ['Power Inverter']
      }
    ];

    getFilteredElements() {
        return [...this.filteredElements];
    }

    getOrgDetail() {
      this.filteredOrgDetail = [...this.orgDetail];
      return [...this.filteredOrgDetail];
    }

    getFilteredResultCount() {
      return of(this.filteredOrgDetail.length);
    }

    getAllProductValues() {
      return [...this.productValues];
    }

    getAllIndustryValues() {
      return [...this.industryValues];
    }

    getProductValues() {
      return [...this.productValues.slice(0,6)];
    }

    getIndustryValues() {
      return [...this.industryValues.slice(0,6)];
    }

    private addFilteredElement(value: string, type: string) {
      const element: Filter = {type: type, value: value};
      this.filteredElements.push(element);
      this.filteredElementEvent.next([...this.filteredElements]);
    }

    private deleteFilteredElement(element: string) {
        this.filteredElements = this.filteredElements.filter(
            (item) => { return item.value != element}
        );
        this.filteredElementEvent.next([...this.filteredElements]);
    }

    private changeIndustryCheckBox(industry: string, isToBeChecked: boolean) {
      this.industryValues.map(
        element => {
          if(element.value == industry) {
            element.isChecked = isToBeChecked;
          }
        }
      );
      this.industryUncheckEvent.next([...this.industryValues]);
    }

    private changeProductCheckBox(product: string, isToBeChecked: boolean) {
      this.productValues.map(
        element => {
          if(element.value == product) {
            element.isChecked = isToBeChecked;
          }
        }
      );
      this.productUncheckEvent.next([...this.productValues]);
    }

    filterByListofProducts(products: string[]) {
      this.clearFilterByType('product');
      products.map(
        product => {
          this.addFilteredElement(product, 'product');
          this.productFilters.push(product);
          this.changeProductCheckBox(product, true);
        }
      );
      this.filter();
    }

    filterByListofIndustries(industries: string[]) {
      this.clearFilterByType('industry');
      industries.map(
        industry => {
          this.addFilteredElement(industry, 'industry');
          this.industryFilters.push(industry);
          this.changeIndustryCheckBox(industry, true);
        }
      );
      this.filter();
    }

    filterByProduct(product: string) {
      this.addFilteredElement(product, 'product');
      this.productFilters.push(product);
      this.filter();
      this.changeProductCheckBox(product, true);
    }

    unFilterByProduct(product: string) {
      this.deleteFilteredElement(product);
      this.productFilters = this.productFilters.filter((val) => {return val != product});
      this.filter();
      this.filteredElements = this.filteredElements.filter((element) => {return element.value != product});
      this.filteredElementEvent.next(this.filteredElements);
      this.changeProductCheckBox(product, false);
    }

    filterByIndustry(industry: string) {
      this.addFilteredElement(industry, 'industry');
      this.industryFilters.push(industry);
      this.filter();
      this.changeIndustryCheckBox(industry, true);
    }

    unFilterByIndustry(industry: string) {
      this.deleteFilteredElement(industry);
      this.industryFilters = this.industryFilters.filter((val) => {return val != industry});
      this.filter();
      this.filteredElements = this.filteredElements.filter((element) => {return element.value != industry});
      this.filteredElementEvent.next(this.filteredElements);
      this.changeIndustryCheckBox(industry, false);
    }

    filter() {
      this.filteredOrgDetail = this.orgDetail.filter(
        (org) => { return this.industryFilters.every((val) => org.industry.includes(val))}
      );
      this.filteredOrgDetail = this.filteredOrgDetail.filter(
        (org) => { return this.productFilters.every((val) => org.product.includes(val));}
      );
      this.filteredOrgDetailEvent.next([...this.filteredOrgDetail]);
    }

    clearFilterByType(type: string) {
      this.filteredElements.filter((element) => {return element.type != type});
    }

    clearAllFilters() {
      this.filteredElements = [];
      this.filteredElementEvent.next(this.filteredElements);
      this.filteredOrgDetail = [...this.orgDetail];
      this.filteredOrgDetailEvent.next(this.filteredOrgDetail);
      this.industryValues.map(
        element => element.isChecked = false
      );
      this.productValues.map(
        element =>  element.isChecked = false
      );
      this.industryUncheckEvent.next(this.industryValues);
      this.productUncheckEvent.next(this.productValues);
    }
}