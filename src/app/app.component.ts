import { Component } from '@angular/core';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from './dialogs/message-box-custom-message/message-box-custom-message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CAJS_Web_APP';

  constructor(
    public router: Router,
    public dialog: MatDialog,) { }

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
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: "Opa, essa é uma feature futura. Aguarde que avisaremos quando lançar" },
      width: "50%",
      height: "15%"
    })
        
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

