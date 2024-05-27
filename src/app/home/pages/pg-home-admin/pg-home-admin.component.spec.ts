import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgHomeAdminComponent } from './pg-home-admin.component';

describe('PgHomeAdminComponent', () => {
  let component: PgHomeAdminComponent;
  let fixture: ComponentFixture<PgHomeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgHomeAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgHomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
