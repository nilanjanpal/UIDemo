import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenubarComponent } from './navigation/menubar/menubar.component';
import { ProductComponent } from './filters/product/product.component';
import { IndustryComponent } from './filters/industry/industry.component';
import { OrgdetailComponent } from './orgdetail/orgdetail.component';
import { FilteredElementComponent } from './filtered-element/filtered-element.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    ProductComponent,
    IndustryComponent,
    OrgdetailComponent,
    FilteredElementComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
