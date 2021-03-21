import { Component } from '@angular/core';
import { OrgService } from './services/org.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-ui-template';

  constructor(public orgService: OrgService) {}

  onClear() {
    this.orgService.clearAllFilters();
  }
}
