import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGenericSectionComponent } from './header-generic-section.component';

describe('HeaderGenericSectionComponent', () => {
  let component: HeaderGenericSectionComponent;
  let fixture: ComponentFixture<HeaderGenericSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderGenericSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderGenericSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
