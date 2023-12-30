import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeAlcancePortfoliaComponent } from './equipe-alcance-portfolia.component';

describe('EquipeAlcancePortfoliaComponent', () => {
  let component: EquipeAlcancePortfoliaComponent;
  let fixture: ComponentFixture<EquipeAlcancePortfoliaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeAlcancePortfoliaComponent]
    });
    fixture = TestBed.createComponent(EquipeAlcancePortfoliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
