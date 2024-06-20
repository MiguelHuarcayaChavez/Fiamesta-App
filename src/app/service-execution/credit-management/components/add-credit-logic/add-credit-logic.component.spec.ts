import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditLogicComponent } from './add-credit-logic.component';

describe('AddCreditLogicComponent', () => {
  let component: AddCreditLogicComponent;
  let fixture: ComponentFixture<AddCreditLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditLogicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCreditLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
