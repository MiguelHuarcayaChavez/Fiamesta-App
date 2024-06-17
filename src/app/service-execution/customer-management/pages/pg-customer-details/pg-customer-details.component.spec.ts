import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgCustomerDetailsComponent } from './pg-customer-details.component';

describe('PgCustomerDetailsComponent', () => {
  let component: PgCustomerDetailsComponent;
  let fixture: ComponentFixture<PgCustomerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgCustomerDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
