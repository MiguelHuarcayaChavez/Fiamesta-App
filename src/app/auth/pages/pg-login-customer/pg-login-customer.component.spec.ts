import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgLoginCustomerComponent } from './pg-login-customer.component';

describe('PgLoginCustomerComponent', () => {
  let component: PgLoginCustomerComponent;
  let fixture: ComponentFixture<PgLoginCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgLoginCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgLoginCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
