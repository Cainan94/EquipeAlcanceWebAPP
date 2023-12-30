import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-box-custom-message',
  templateUrl: './message-box-custom-message.component.html',
  styleUrls: ['./message-box-custom-message.component.scss']
})
export class MessageBoxCustomMessageComponent {

  constructor( public dialogRef: MatDialogRef<MessageBoxCustomMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message:string}){}
      
}
