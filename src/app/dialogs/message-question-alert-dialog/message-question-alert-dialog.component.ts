import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-question-alert-dialog',
  templateUrl: './message-question-alert-dialog.component.html',
  styleUrls: ['./message-question-alert-dialog.component.scss']
})
export class MessageQuestionAlertDialogComponent {

  constructor( public dialogRef: MatDialogRef<MessageQuestionAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message:string}){}
}
