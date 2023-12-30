import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { LiveScheduleService } from '../../../services/live-schedule.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddScheduleComponent } from './dialogs/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './dialogs/edit-schedule/edit-schedule.component';
import { GlobalService } from '../../../global.service';
import { LiveScheduleTable } from 'src/app/models/LiveSchedules/LiveScheduleTable';

@Component({
  selector: 'app-live-schedule',
  templateUrl: './live-schedule.component.html',
  styleUrls: ['./live-schedule.component.scss']
})
export class LiveScheduleComponent {

  public formRangeDate: FormGroup = new FormGroup('');
  dataSource = new MatTableDataSource<LiveScheduleTable>()
  selection = new SelectionModel<LiveScheduleTable>(true, []);
  listSchedules = new Array<LiveScheduleTable>();
  isprocess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private lsService: LiveScheduleService,
    private route: Router,
    public dialog: MatDialog,
  ) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }
  }

  ngOnInit(): void {
    this.isprocess = true;
    this.configureComponents();

  }

  async makeTheList() {
    let startDate: Date = new Date(this.formRangeDate.get('start')?.value);
    let endDate: Date = new Date(this.formRangeDate.get('end')?.value);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999)
    this.listSchedules = new Array();
    await this.lsService.getAllAgendamentosActive(startDate.getTime(), endDate.getTime()).subscribe(agendamentoResponse => {
      this.listSchedules = agendamentoResponse;
      this.isprocess = false;
    })
  }

  configureComponents() {
    this.formRangeDate = this.fb.group({
      start: [new Date(), [Validators.required]],
      end: [new Date(), [Validators.required]]
    })
    this.makeTheList();
  }

  changeDate() {
    this.isprocess = true;
    this.makeTheList();
  }

  openLink(url: string) {
    window.open(url, "_blank")
  }

  addSchedule() {

    const dialogRef = this.dialog.open(AddScheduleComponent, {
      height: '55%',
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.changeDate();
    })
  }

  editSchedule() {
    const dialogRef = this.dialog.open(EditScheduleComponent, {
      height: '55%',
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.changeDate();
    })
  }
}
