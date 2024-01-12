import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';
import { UtilsService } from 'src/app/utils.service';
import { WhatchStreamComponent } from '../whatch-stream/whatch-stream.component';
import { TwitchAPIServiceService } from 'src/app/services/twitch-apiservice.service';

@Component({
  selector: 'app-prepare-towatch',
  templateUrl: './prepare-towatch.component.html',
  styleUrls: ['./prepare-towatch.component.scss']
})
export class PrepareTowatchComponent {
  stopLurk: boolean = true;
  schedules = new Array<LiveSchedulesDTOResponse>()
  currentStreamer = new StreamersDTOResponse();
  changeStreamer = false;
  lurkOpened = false;
  constructor(
    private lsService: LiveScheduleService,
    private twitchService: TwitchAPIServiceService,
    public dialog: MatDialog,
  ) { }

  async startLurk() {
    let dialog = this.dialog.open(WhatchStreamComponent, {
      data: "equipealcance",
      height: '90%',
      width: '90%'
    });
    dialog.afterOpened().subscribe(()=>this.lurkOpened = true)

    this.stopLurk = false;
    console.log(UtilsService.getDateTimeZoneSP() + " - " + UtilsService.getTimeTimeZoneSP());
    await this.getSchedules();
    await this.getCurrentStreamer();
    if (this.currentStreamer.twitchName != null && this.currentStreamer.twitchName.length > 0) {
      this.openLurk(dialog);
    }
    const intervalID = setInterval(async () => {
      if (this.stopLurk) {
        clearInterval(intervalID)
      }
      let auxStreamer = this.currentStreamer.twitchName;
      await this.getCurrentStreamer();
      if(auxStreamer!=this.currentStreamer.twitchName){
        this.openLurk(dialog);
      }

    }, 60000)
  }
  openLurk(dialog: MatDialogRef<WhatchStreamComponent, any>) {
    if(this.lurkOpened == true){
      dialog.close();
      dialog.afterClosed().subscribe(()=>{
        this.lurkOpened = false;
        dialog = this.dialog.open(WhatchStreamComponent, {
          data: this.currentStreamer.twitchName,
          height: '90%',
          width: '90%'
        });
        dialog.afterOpened().subscribe(()=>this.lurkOpened = true)
      })
    }
  }
  

  async getSchedules() {
    await this.lsService.AllScheduleOfDay().subscribe(res => {
      this.schedules = res;
    }, error => {
      this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
    });
  }

  getCurrentStreamer() {
    let currenttime = new Date().getTime();
    let reserva = new StreamersDTOResponse();

    if (this.schedules == null || this.schedules.length < 1) {
      reserva = new StreamersDTOResponse();
      reserva.twitchName = "equipealcance"
      this.currentStreamer = reserva;
    } else {
      for (let id = 0; id < this.schedules.length; id++) {
        const element = this.schedules[id];
        if (element.streamersDTOResponse == null) {
          reserva = new StreamersDTOResponse();
          reserva.twitchName = "equipealcance"
          this.currentStreamer = reserva;
          break;
        } else {
          if (currenttime >= element.startTime && currenttime <= element.endTime) {
            if (this.currentStreamer.twitchName != element.streamersDTOResponse.twitchName) {
              this.changeStreamer = true;
            }
            this.currentStreamer = element.streamersDTOResponse;
            break;
          }
        }
      }
    }
  }

  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }
  stop() {
    this.stopLurk = true;
  }
}
