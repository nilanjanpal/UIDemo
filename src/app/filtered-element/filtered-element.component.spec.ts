import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredElementComponent } from './filtered-element.component';

describe('FilteredElementComponent', () => {
  let component: FilteredElementComponent;
  let fixture: ComponentFixture<FilteredElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
