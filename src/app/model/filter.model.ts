export interface Filter {
    type: string;
    value: string;
}

export interface CheckBox {
    isChecked: boolean;
    value: string;
}

export interface ModalData {
    checkbox: CheckBox[];
    itemType: string;
}