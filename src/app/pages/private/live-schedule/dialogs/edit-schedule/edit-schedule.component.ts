import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { MessageQuestionAlertDialogComponent } from 'src/app/dialogs/message-question-alert-dialog/message-question-alert-dialog.component';
import { LiveScheduleTable } from 'src/app/models/LiveSchedules/LiveScheduleTable';
import { LiveSchedulesDTORequest } from 'src/app/models/LiveSchedules/LiveSchedulesDTORequest';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { StreamersDTORequest } from 'src/app/models/Streamers/StreamersDTORequest';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';

class Time {
  id: number
  value: String

  constructor(id: number, value: String) {
    this.id = id;
    this.value = value;
  }
}

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent {

  minDate = new Date();
  scheduleDay = new Date(0);
  schedules = new Array<LiveSchedulesDTOResponse>();
  Agendamentos = new Array<LiveScheduleTable>();
  streamers = new Array<StreamersDTOResponse>();
  streamerSelected = new StreamersDTOResponse();
  timeSelected = new Time(0, "");
  listOfAvailableSchedules = new Array<Time>();
  changeTime = false;


  constructor(
    public dialogRef: MatDialogRef<EditScheduleComponent>,
    public dialog: MatDialog,
    private lsService: LiveScheduleService,
  ) { }

  async selectDate(event: any) {
    this.scheduleDay = new Date(event.value._d);
    let startDay = new Date(event.value._d);
    let endDay = new Date(event.value._d);
    startDay.setHours(0, 0, 0, 0);
    endDay.setHours(23, 59, 59, 999);

    await this.lsService.getSChedulesActivesByPeriod(startDay.getTime(), endDay.getTime()).subscribe(async responseSchedules => {
      if (responseSchedules != undefined) {
        this.schedules = responseSchedules;
        await  this.lsService.getAllAgendamentosActive(startDay.getTime(), endDay.getTime()).subscribe(agendamentoResponse=>{
          this.Agendamentos = agendamentoResponse;
        })
      }
      this.lsService.getAllStreamerAgendado(this.scheduleDay.getTime()).subscribe(responseStreamers => {

        if (responseStreamers != undefined) {
          if (responseStreamers.length > 0) {
            this.streamers = responseStreamers;
          }
        }
      });
      this.initListOfTime();
    });
  }

  async initListOfTime() {
    await this.lsService.getAvailableHours(this.scheduleDay.getTime()).subscribe(result => {
      this.listOfAvailableSchedules = result;
    })
  }

  trocarHorario() {
    this.changeTime = !this.changeTime;
  }

  excluirHorario() {
    const dialogRef = this.dialog.open(MessageQuestionAlertDialogComponent, {
      data: { message: "tem certeza que deseja excluir esse agendamento?" },
      width: '65%',
      height: '15%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        let schedule = this.schedules.filter(filter => filter. streamersDTOResponse.id == this.streamerSelected.id)[0];
        let strReq: StreamersDTORequest = new StreamersDTORequest();
        let lsReq: LiveSchedulesDTORequest = new LiveSchedulesDTORequest();

        strReq.birthday = schedule.streamersDTOResponse.birthday;
        strReq.id = schedule.streamersDTOResponse.id;
        strReq.twitchName = schedule.streamersDTOResponse.twitchName;
        strReq.visible = schedule.streamersDTOResponse.visible;

        lsReq.deleted = schedule.deleted;
        lsReq.endTime = schedule.endTime;
        lsReq.id = schedule.id;
        lsReq.startTime = schedule.startTime;
        lsReq.streamersDTORequest = strReq;
        lsReq.visible = schedule.visible;

        this.lsService.delete(lsReq).subscribe(result => {
          const dialogRef2 = this.dialog.open(MessageBoxCustomMessageComponent, {
            data: { message: "Agendamento Excluido!" },
            width: "50%",
            height: "15%",
          })
          dialogRef2.afterClosed().subscribe(ret => this.dialog.closeAll())
        })
      }
    })
  }
  Salvar() {
    const dialogRef = this.dialog.open(MessageQuestionAlertDialogComponent, {
      data: { message: "tem certeza que deseja Alterar o horario?" },
      width: '65%',
      height: '15%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let schedule = this.schedules.filter(filter => filter.streamersDTOResponse.id == this.streamerSelected.id)[0];
        let strReq: StreamersDTORequest = new StreamersDTORequest();
        let lsReq: LiveSchedulesDTORequest = new LiveSchedulesDTORequest();

        strReq.birthday = schedule.streamersDTOResponse.birthday;
        strReq.id = schedule.streamersDTOResponse.id;
        strReq.twitchName = schedule.streamersDTOResponse.twitchName;
        strReq.visible = schedule.streamersDTOResponse.visible;

        let startTimeSchedule: Date = new Date(this.scheduleDay.getTime())

        startTimeSchedule.setHours(Number.parseInt(this.timeSelected.value.split(':')[0]), Number.parseInt(this.timeSelected.value.split(':')[1]), 0, 0)
        let endTimeSchedule: Date = new Date(startTimeSchedule.getTime())

        endTimeSchedule.setHours(startTimeSchedule.getHours() + 1, startTimeSchedule.getMinutes() + 29, 59, 0);


        lsReq.deleted = schedule.deleted;
        lsReq.endTime = endTimeSchedule.getTime();
        lsReq.id = schedule.id;
        lsReq.startTime = startTimeSchedule.getTime();
        lsReq.streamersDTORequest = strReq;
        lsReq.visible = schedule.visible;

        this.lsService.update(lsReq).subscribe(result => {
          if (result.id != undefined && result.id.trim().length > 0) {
            let dialogRef = this.dialog.open(MessageBoxCustomMessageComponent, {
              data: { message: "Agenda atualizada" },
              width: "65%",
              height: "15%"
            })
            dialogRef.afterClosed().subscribe(ret => this.dialog.closeAll())
          }
        })
      }
    })
  }
}
