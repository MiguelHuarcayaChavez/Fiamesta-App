import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgPageNotFoundComponent } from './pg-page-not-found.component';

describe('PgPageNotFoundComponent', () => {
  let component: PgPageNotFoundComponent;
  let fixture: ComponentFixture<PgPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgPageNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
