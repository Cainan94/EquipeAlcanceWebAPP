import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { StreamersComponent } from './pages/private/streamers/streamers.component';
import { LiveScheduleComponent } from './pages/private/live-schedule/live-schedule.component';
import { PontuacaoComponent } from './pages/private/pontuacao/pontuacao.component';
import { EquipeAlcancePortfoliaComponent } from './pages/public/equipe-alcance-portfolia/equipe-alcance-portfolia.component';
import { SideMenuComponent } from './pages/private/side-menu/side-menu.component';
import { SideMenuPublicComponent } from './pages/public/side-menu-public/side-menu-public.component';

const routes: Routes = [
  { path: '', component: SideMenuPublicComponent },
  { path: 'home', component: SideMenuComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
