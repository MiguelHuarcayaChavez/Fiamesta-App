import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCreditLogicComponent } from './modify-credit-logic.component';

describe('ModifyCreditLogicComponent', () => {
  let component: ModifyCreditLogicComponent;
  let fixture: ComponentFixture<ModifyCreditLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCreditLogicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyCreditLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
