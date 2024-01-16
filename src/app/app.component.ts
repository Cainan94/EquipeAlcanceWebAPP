import { Component } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from './dialogs/message-box-custom-message/message-box-custom-message.component';
import { WhatchStreamComponent } from './pages/private/whatch-stream/whatch-stream.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CAJS_Web_APP';

  constructor(
    public router: Router,
    public dialog: MatDialog,
    ) { }
}

