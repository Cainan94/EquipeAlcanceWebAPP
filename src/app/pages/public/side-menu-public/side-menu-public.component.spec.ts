import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuPublicComponent } from './side-menu-public.component';

describe('SideMenuPublicComponent', () => {
  let component: SideMenuPublicComponent;
  let fixture: ComponentFixture<SideMenuPublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuPublicComponent]
    });
    fixture = TestBed.createComponent(SideMenuPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
