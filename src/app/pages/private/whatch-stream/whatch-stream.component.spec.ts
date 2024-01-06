import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatchStreamComponent } from './whatch-stream.component';

describe('WhatchStreamComponent', () => {
  let component: WhatchStreamComponent;
  let fixture: ComponentFixture<WhatchStreamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatchStreamComponent]
    });
    fixture = TestBed.createComponent(WhatchStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
