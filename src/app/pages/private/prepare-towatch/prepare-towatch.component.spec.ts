import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareTowatchComponent } from './prepare-towatch.component';

describe('PrepareTowatchComponent', () => {
  let component: PrepareTowatchComponent;
  let fixture: ComponentFixture<PrepareTowatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrepareTowatchComponent]
    });
    fixture = TestBed.createComponent(PrepareTowatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
