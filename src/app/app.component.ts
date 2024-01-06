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

  UserIsADM() {
    return GlobalService.userLoggedIsADM()
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToStreamers() {
    this.router.navigate(['streamers']);
  }

  goToPontuacao() {
    this.router.navigate(['pontuacoes']);
  }

  goToAgendamentos() {
    this.router.navigate(['agendamento']);
  }
  goToWatchStreamer() {

    const dialogRef = this.dialog.open(WhatchStreamComponent, {
      height: '100%',
      width: '100%'
    });
    // let newWindow = window.open('https://www.twitch.tv/abunho', 'com_MyDomain_myWindowForThisPurpose', 'height=960px,width=940px');
    // setInterval(() => {
    //   console.log("chegou a hora de trocar");
    //   newWindow = window.open('https://www.twitch.tv/Hperez22', 'com_MyDomain_myWindowForThisPurpose', 'height=960px,width=940px');
    // },60000)
  }

  showToolbar(){
    return this.router.routerState.snapshot.url !== '/' && this.router.routerState.snapshot.url !== '/login'
  }
}

