import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamersComponent } from './streamers.component';

describe('StreamersComponent', () => {
  let component: StreamersComponent;
  let fixture: ComponentFixture<StreamersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamersComponent]
    });
    fixture = TestBed.createComponent(StreamersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
