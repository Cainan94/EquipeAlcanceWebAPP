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
  pontuacao: number = 0;
  loading = false;
  constructor(
    private lsService: LiveScheduleService,
    public dialog: MatDialog,
  ) { }
  
  ngOnInit() {

    this.getSchedules();
  }

  async startLurk() {
    let dialog = this.dialog.open(WhatchStreamComponent, {
      data: this.currentStreamer.twitchName,
      height: '90%',
      width: '90%'
    });
    dialog.afterOpened().subscribe(()=>this.lurkOpened = true)

    this.stopLurk = false;
    if (this.currentStreamer.twitchName != null && this.currentStreamer.twitchName.trim().length > 0) {
      this.openLurk(dialog);
    }

    const intervalID = setInterval(async () => {
      if (this.stopLurk) {
        clearInterval(intervalID)
        this.lurkOpened = false;
      }
      let auxStreamer = this.currentStreamer.twitchName;
      await this.getCurrentStreamer();
      this.getPontuacao();
      if (auxStreamer != this.currentStreamer.twitchName) {
        this.openLurk(dialog);
      }
    }, 60000)
  }

  getPontuacao() {

    let startDate = new Date();

    let endDate = new Date(new Date().setHours(23, 59, 59));
    this.lsService.getAllPonctuationByPeriodAndUser(startDate.getTime(), endDate.getTime()).subscribe(result => {
      if(result.length!=null && result.length>0){
        if(result[0].pontuacaoes.length!=null && result[0].pontuacaoes.length>0){
          this.pontuacao = result[0].pontuacaoes[0].score
        }
      }
    })
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
    this.loading = true;
    await this.lsService.AllScheduleOfDay().subscribe(async res => {
      this.schedules = res;
      await this.getCurrentStreamer();
      this.getPontuacao();
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
      this.loading = false;
    } else {
      for (let id = 0; id < this.schedules.length; id++) {
        const element = this.schedules[id];
        if (element.streamersDTOResponse == null) {
          reserva = new StreamersDTOResponse();
          reserva.twitchName = "equipealcance"
          this.currentStreamer = reserva;
        } else {
          if (currenttime >= element.startTime && currenttime <= element.endTime) {
            if (this.currentStreamer.twitchName != element.streamersDTOResponse.twitchName) {
              this.changeStreamer = true;
            }
            this.currentStreamer = element.streamersDTOResponse;
            this.loading = false;
            console.log("encontrou");
            console.log(this.currentStreamer);
            
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
