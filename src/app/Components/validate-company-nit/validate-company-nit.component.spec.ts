import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCompanyNitComponent } from './validate-company-nit.component';

describe('ValidateCompanyNitComponent', () => {
  let component: ValidateCompanyNitComponent;
  let fixture: ComponentFixture<ValidateCompanyNitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateCompanyNitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCompanyNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
