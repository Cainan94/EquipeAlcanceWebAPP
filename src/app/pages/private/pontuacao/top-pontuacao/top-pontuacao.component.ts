import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { PonctuactionDTOResponse } from 'src/app/models/Ponctuation/PonctuationDTOResponse';
import { LiveScheduleService } from 'src/app/services/live-schedule.service';

@Component({
  selector: 'app-top-pontuacao',
  templateUrl: './top-pontuacao.component.html',
  styleUrls: ['./top-pontuacao.component.scss']
})
export class TopPontuacaoComponent {
  public formRangeDate: FormGroup = new FormGroup('');
  isprocess: boolean = false;
  listTable = new Array<PonctuactionDTOResponse>();

  constructor(
    private lsService: LiveScheduleService,
    private route: Router,
    private fb: FormBuilder,
  ) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }
  }
  ngOnInit(): void {
    this.isprocess = true;
    this.configureComponents();
  }

  configureComponents() {
    this.formRangeDate = this.fb.group({
      start: [new Date(), [Validators.required]],
      end: [new Date(), [Validators.required]]
    })
    this.makeTheList();
  }


  async makeTheList() {
    this.listTable = new Array();
    let startDate: Date = new Date(this.formRangeDate.get('start')?.value);
    let endDate: Date = new Date(this.formRangeDate.get('end')?.value);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999)
    this.isprocess = true;
    await this.lsService.getTopPonctuactionPeriod(startDate.getTime(), endDate.getTime()).subscribe(result => {
      this.listTable = result;
      this.isprocess = false;
    })
  }
}
