import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHomeCustomerComponent } from './pg-home-customer.component';

describe('PgHomeCustomerComponent', () => {
  let component: PgHomeCustomerComponent;
  let fixture: ComponentFixture<PgHomeCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgHomeCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgHomeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
