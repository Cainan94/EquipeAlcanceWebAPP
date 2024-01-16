import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';
import { PonctuationService } from 'src/app/services/ponctuation.service';
import { TwitchAPIServiceService } from 'src/app/services/twitch-apiservice.service';
import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';

@Component({
  selector: 'app-whatch-stream',
  templateUrl: './whatch-stream.component.html',
  styleUrls: ['./whatch-stream.component.scss']
})
export class WhatchStreamComponent {
  streamer: string = 'equipealcance';
  listSchedules = new Array<LiveSchedulesDTOResponse>();
  currentStreamer = new StreamersDTOResponse();
  pontuacao = 0;
  stopInterval = false

  constructor(
    public dialogRef: MatDialogRef<WhatchStreamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialog: MatDialog,
    private twitchService: TwitchAPIServiceService,
    private pontuacaoService: PonctuationService,
    private _snackBar: MatSnackBar,
  ) { this.streamer = data }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnInit(): void {
    const lurk = new TwitchEmbed('playerLurk', {
      width: '100%',
      height: '100%',
      channel: this.streamer,
      layout: TwitchEmbedLayout.VIDEO_WITH_CHAT
    });


    const dev = new TwitchEmbed('playerDev', {
      width: '100%',
      height: '100%',
      channel: "cainanbt",
      layout: TwitchEmbedLayout.VIDEO_WITH_CHAT
    });

    const interval = setInterval(async () => {
      if (this.stopInterval) {
        clearInterval(interval)
      }
      if (await this.checkSreamerLurkOnline(lurk.getChannel())) {
        this.pontuacao = this.pontuacao + 1;
      }
      if (this.pontuacao % 10 == 0) {
        this.pontuacaoService.sendPonctuation(this.pontuacao).subscribe(response => {
          if (response.id != null && response.id.trim().length > 0) {
            this.pontuacao = 0;
            this.openSnackBar("Pontuação registrada", "OK")
          }
        }, error => {
          this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
        });
      }
    }, 60000)
  }

  ngOnDestroy() {
    this.stopInterval = true
  }

  async checkSreamerLurkOnline(showingChannel?: string) {
    if (await this.twitchService.StreamIsOnlineAsync(this.data) && showingChannel != null && showingChannel.trim().length > 0 && await this.twitchService.checkCurrentStreamAsync(showingChannel, this.data)) {
      return true;
    }
    return true;
  }

  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }
}

