import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-equipe-alcance-portfolia',
  templateUrl: './equipe-alcance-portfolia.component.html',
  styleUrls: ['./equipe-alcance-portfolia.component.scss']
})
export class EquipeAlcancePortfoliaComponent {
  hide: boolean = true;
  logo = GlobalService.logo

  constructor(private route: Router,){

  }

  goToLogin() {
      this.route.navigate(['/login'])
  }

  goToFormRecruiter(){
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSeCvilAG_sR4XYzIQrN7UW2ZlSAbPWxMn1nOr2bDeJ_Qqpx_A/viewform?usp=sf_link","_blank")?.focus();
  }
}
