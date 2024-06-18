import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgModifyCreditComponent } from './pg-modify-credit.component';

describe('PgModifyCreditComponent', () => {
  let component: PgModifyCreditComponent;
  let fixture: ComponentFixture<PgModifyCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgModifyCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgModifyCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
