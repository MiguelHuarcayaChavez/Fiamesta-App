import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgModifyCustomerDataComponent } from './pg-modify-customer-data.component';

describe('PgModifyCustomerDataComponent', () => {
  let component: PgModifyCustomerDataComponent;
  let fixture: ComponentFixture<PgModifyCustomerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgModifyCustomerDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgModifyCustomerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
