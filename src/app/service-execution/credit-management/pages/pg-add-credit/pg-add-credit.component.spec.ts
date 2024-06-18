import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgAddCreditComponent } from './pg-add-credit.component';

describe('PgAddCreditComponent', () => {
  let component: PgAddCreditComponent;
  let fixture: ComponentFixture<PgAddCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgAddCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgAddCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
