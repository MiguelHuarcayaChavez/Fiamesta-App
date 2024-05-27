import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgLoginAdminComponent } from './pg-login-admin.component';

describe('PgLoginAdminComponent', () => {
  let component: PgLoginAdminComponent;
  let fixture: ComponentFixture<PgLoginAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgLoginAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PgLoginAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
