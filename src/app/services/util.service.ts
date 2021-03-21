import { Injectable } from "@angular/core";
import { of, Subject } from "rxjs";
import { CheckBox, ModalData } from "../model/filter.model";
import { OrgService } from "./org.service";

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    private isModalVisible = 'hide';
    private itemType: string;
    modalVisibilityEvent = new Subject<string>();

    constructor(private orgService: OrgService) {}

    hideModal() {
        this.isModalVisible = 'hide';
        this.itemType = '';
        this.modalVisibilityEvent.next(this.isModalVisible);
    }

    showModal(type: string) {
        this.isModalVisible = 'show';
        this.itemType = type;
        this.modalVisibilityEvent.next(this.isModalVisible);
    }

    getModalData() {
        let checkBoxData: ModalData = {checkbox: [], itemType: ''};
        if(this.itemType == 'Product') {
            checkBoxData.checkbox = this.orgService.getAllProductValues();
        } 
        if(this.itemType == 'Industry') {
            checkBoxData.checkbox = this.orgService.getAllIndustryValues();
        }
        checkBoxData.itemType = this.itemType;
        return checkBoxData;
    }

    getModalVisibilty() {
        return this.isModalVisible;
    }

}