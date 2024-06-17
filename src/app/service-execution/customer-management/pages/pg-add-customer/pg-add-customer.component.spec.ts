import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAddCustomerComponent } from './pg-add-customer.component';

describe('PgAddCustomerComponent', () => {
  let component: PgAddCustomerComponent;
  let fixture: ComponentFixture<PgAddCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgAddCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgAddCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
