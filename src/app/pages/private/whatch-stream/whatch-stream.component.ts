import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';
import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';

@Component({
  selector: 'app-whatch-stream',
  templateUrl: './whatch-stream.component.html',
  styleUrls: ['./whatch-stream.component.scss']
})
export class WhatchStreamComponent {

  listSchedules = new Array<LiveSchedulesDTOResponse>();
  currentStreamer = new StreamersDTOResponse();
  ngOnInit(): void {
    const twitchEmbed = new TwitchEmbed('twitch-player', {
      width: '100%',
      height: '90%',
      channel: 'equipealcance',
      layout: TwitchEmbedLayout.VIDEO_WITH_CHAT
    });
    twitchEmbed.getPlayer();
    this.getSchedules();
  }


  constructor(
    public dialogRef: MatDialogRef<WhatchStreamComponent>,
    public dialog: MatDialog,
    private lsService: LiveScheduleService,
    ) {}

    private openTwitch(channel:string){

    }

    async getSchedules() {
      await this.lsService.AllScheduleOfDay().subscribe(result=>{
        console.log(result);
        this.listSchedules = result; 
        this.configAgenda();       
      });
    }
  configAgenda() {
    let epochNow = new Date().getTime();
    console.log(epochNow);
    
    let reserva = new StreamersDTOResponse();
    reserva.twitchName = "equipealcance";
     this.currentStreamer = reserva;
    if(this.listSchedules == null || this.listSchedules.length < 1){
       this.currentStreamer = reserva;
    } else{
      this.listSchedules.forEach(schedule=>{
        if(epochNow >= schedule.startTime && epochNow <= schedule.endTime){
          this.currentStreamer = schedule.streamersDTOResponse;
        }
      });
    }
    this.setStreamer();
  }
  setStreamer(){
      this.openTwitch(this.currentStreamer.twitchName);
  }
}

