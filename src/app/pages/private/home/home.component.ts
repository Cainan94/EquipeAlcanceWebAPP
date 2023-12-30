import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { TwitchEmbed, TwitchEmbedLayout, TwitchPlayer } from 'twitch-player';
import { AddScheduleComponent } from '../live-schedule/dialogs/add-schedule/add-schedule.component';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { UtilsService } from 'src/app/utils.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  lastLive:String = ""
  constructor(private route: Router,
    public dialog: MatDialog,
    private lsService: LiveScheduleService) {

  }
  ngOnInit(): void {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }

    this.getLastLive();
    const embed = new TwitchEmbed('twitch-player', {
      width: 1280,
      height: 720,
      channel: 'magames01',
      layout: TwitchEmbedLayout.VIDEO_WITH_CHAT
    });
    embed.getPlayer();
  }
  async getLastLive() {
    await this.lsService.getLastScheduleUser().subscribe(result=>{
      this.lastLive = UtilsService.dateToString(new Date(result.startTime))
    },error=>{
      this.openDialogCustomMessage(error.error.detailedMessage,"50%","15%")
    });
  }
  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }

  UserIsADM() {
    return GlobalService.userLoggedIsADM()
  }

  async addSchedule() {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      height: '55%',
      width: '60%'
    });
    await dialogRef.afterClosed().subscribe(()=>this.getLastLive())
  }
  
}
