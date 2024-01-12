import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-side-menu-public',
  templateUrl: './side-menu-public.component.html',
  styleUrls: ['./side-menu-public.component.scss']
})
export class SideMenuPublicComponent {

  opensite: boolean = true;
  openlogin:  boolean = false;

  constructor(private route: Router,) {
    
  }

  userisNotLogged(){
    return GlobalService.user == null || GlobalService.user.username.trim().length < 1;
  }

  gotoLogin(sideNav:MatSidenav){
    this.openlogin = true;
    this.opensite = false;
    sideNav.toggle()
  }
  gotoSite(sideNav:MatSidenav){
    this.openlogin = false;
    this.opensite = true;
    sideNav.toggle()
  }
}
