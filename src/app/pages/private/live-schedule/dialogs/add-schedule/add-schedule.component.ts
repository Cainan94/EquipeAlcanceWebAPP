import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { GlobalService } from 'src/app/global.service';
import { AvailableHours } from 'src/app/models/LiveSchedules/AvailableHours';
import { LiveSchedulesDTORequest } from 'src/app/models/LiveSchedules/LiveSchedulesDTORequest';
import { LiveSchedulesDTOResponse } from 'src/app/models/LiveSchedules/LiveSchedulesDTOResponse';
import { StreamersDTORequest } from 'src/app/models/Streamers/StreamersDTORequest';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';
import { StreamersService } from 'src/app/services/streamers.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent {

  minDate = new Date();
  scheduleDay = new Date(0);
  streamers = new Array<StreamersDTOResponse>();
  streamerSelected = new StreamersDTOResponse();
  timeSelected = new AvailableHours();
  listOfAvailableSchedules = new Array<AvailableHours>()
  
  listOfAvailableSchedulesNotADM = new Array<AvailableHours>()
  scheduleDayNotADM = new Date(0);
  streamerSelectedNotADM = new StreamersDTOResponse();
  timeSelectedNotADM = new AvailableHours()

  
  constructor(
    public dialogRef: MatDialogRef<AddScheduleComponent>,
    public dialog: MatDialog,
    private lsService: LiveScheduleService,
    private streamerService: StreamersService,
  ) { }

  ngOnInit(): void {
    if(!this.UserIsADM()){
      this.streamerSelectedNotADM = GlobalService.user.streamersDTOResponse;
    }
  }

  async selectDateNotADM(event: any){
    this.scheduleDayNotADM = new Date(event.value._d);

    let startDay = new Date(event.value._d);
    let endDay = new Date(event.value._d);
    startDay.setHours(0, 0, 0, 0);
    endDay.setHours(23, 59, 59, 999);
    this.initListOfTimeNotADM();

  }
  
  async selectDate(event: any) {
    this.scheduleDay = new Date(event.value._d);

    let startDay = new Date(event.value._d);
    let endDay = new Date(event.value._d);
    startDay.setHours(0, 0, 0, 0);
    endDay.setHours(23, 59, 59, 999);

    this.lsService.getAllStreamerPodeAgendar(this.scheduleDay.getTime()).subscribe(responseStreamers => {
      if (responseStreamers != undefined) {
        if (responseStreamers.length > 0) {
          this.streamers = responseStreamers;
        }
      }
    },error=>{
      this.openDialogCustomMessage(error.error.detailedMessage,"50%","15%")
    });

    this.initListOfTime();
  }

  async initListOfTimeNotADM() {
    await this.lsService.getAvailableHours(this.scheduleDayNotADM.getTime()).subscribe(result => {
      this.listOfAvailableSchedules = result;
    },error=>{
      this.openDialogCustomMessage(error.error.detailedMessage,"50%","15%")
    });
  }

  async initListOfTime() {
    await this.lsService.getAvailableHours(this.scheduleDay.getTime()).subscribe(result => {
      this.listOfAvailableSchedules = result;
    })
  }

  async AddScheduleNotADM() {    
    let request = new LiveSchedulesDTORequest();
    let startTimeSchedule: Date = new Date(this.scheduleDayNotADM.getTime())
    startTimeSchedule.setHours(Number.parseInt(this.timeSelected.value.split(':')[0]), Number.parseInt(this.timeSelected.value.split(':')[1]), 0, 0)
    let endTimeSchedule: Date = new Date(startTimeSchedule.getTime())

    endTimeSchedule.setHours(startTimeSchedule.getHours() + 1, startTimeSchedule.getMinutes(), 59, 0);

    request.endTime = endTimeSchedule.getTime();
    request.startTime = startTimeSchedule.getTime();
    request.streamersDTORequest = StreamersDTORequest.getModelWithUser(this.streamerSelectedNotADM.twitchName)
    await this.lsService.registerByUser(request).subscribe(async result => {
      if (result != null && result.id != null && result.id.trim().length > 0) {
        const dialogSuc = this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Agendamento adicionado" },
          width: "50%",
          height: "15%"
        });
        await dialogSuc.afterClosed().subscribe(() => this.dialogRef.close());
      }
    },error=>{
      this.openDialogCustomMessage(error.error.detailedMessage,"50%","15%")
    });
  }

  async AddSchedule() {
    let request = new LiveSchedulesDTORequest();
    let startTimeSchedule: Date = new Date(this.scheduleDay.getTime())

    startTimeSchedule.setHours(Number.parseInt(this.timeSelected.value.split(':')[0]), Number.parseInt(this.timeSelected.value.split(':')[1]), 0, 0)
    let endTimeSchedule: Date = new Date(startTimeSchedule.getTime())

    endTimeSchedule.setHours(startTimeSchedule.getHours() + 1, startTimeSchedule.getMinutes(), 59, 0);

    request.endTime = endTimeSchedule.getTime();
    request.startTime = startTimeSchedule.getTime();
    request.streamersDTORequest = StreamersDTORequest.getModelWithUser(this.streamerSelected.twitchName);

    await this.lsService.register(request).subscribe(async result => {
      if (result != null && result.id != null && result.id.trim().length > 0) {
        const dialogSuc = this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Agendamento adicionado" },
          width: "50%",
          height: "15%"
        });
        await dialogSuc.afterClosed().subscribe(() => this.dialogRef.close());
      }
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
}

