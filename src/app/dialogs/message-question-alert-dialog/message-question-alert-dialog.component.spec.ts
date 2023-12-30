import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageQuestionAlertDialogComponent } from './message-question-alert-dialog.component';

describe('MessageQuestionAlertDialogComponent', () => {
  let component: MessageQuestionAlertDialogComponent;
  let fixture: ComponentFixture<MessageQuestionAlertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageQuestionAlertDialogComponent]
    });
    fixture = TestBed.createComponent(MessageQuestionAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
