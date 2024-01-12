import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { EquipeAlcancePortfoliaComponent } from '../../public/equipe-alcance-portfolia/equipe-alcance-portfolia.component';
import { UserDTOResponse } from 'src/app/models/User/UserDTOResponse';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {


  user: UserDTOResponse = new UserDTOResponse()

  openDashboard = true;
  openStreamers = false;
  openPontuacoes = false;
  openAgendamentos = false;
  openLurkonline = false;

  constructor(private route: Router,) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate(['/'])
    }
    this.user = GlobalService.user;
  }

  userisNotLogged() {
    return GlobalService.user == null || GlobalService.user.username.trim().length < 1;
  }

  UserIsADM() {
    return GlobalService.userLoggedIsADM()
  }

  logout(sideNav: MatSidenav) {
    GlobalService.user = new UserDTOResponse();
    this.route.navigate(['/'])
  }

  goToHome(sideNav: MatSidenav  ) {
    this.openDashboard = true;
    this.openStreamers = false;
    this.openPontuacoes = false;
    this.openAgendamentos = false;
    this.openLurkonline = false;

    sideNav.toggle()
  }

  goToStreamers(sideNav: MatSidenav) {
    this.openDashboard = false;
    this.openStreamers = true;
    this.openPontuacoes = false;
    this.openAgendamentos = false;
    this.openLurkonline = false;

    sideNav.toggle()
  }

  goToPontuacao(sideNav: MatSidenav) {
    this.openDashboard = false;
    this.openStreamers = false;
    this.openPontuacoes = true;
    this.openAgendamentos = false;
    this.openLurkonline = false;

    sideNav.toggle()
  }

  goToAgendamentos(sideNav: MatSidenav) {
    this.openDashboard = false;
    this.openStreamers = false;
    this.openPontuacoes = false;
    this.openAgendamentos = true;
    this.openLurkonline = false;
    sideNav.toggle()
  }
  goToLurkOnline(sideNav: MatSidenav) {
    this.openDashboard = false;
    this.openStreamers = false;
    this.openPontuacoes = false;
    this.openAgendamentos = false;
    this.openLurkonline = true;
    sideNav.toggle()
  }
}
