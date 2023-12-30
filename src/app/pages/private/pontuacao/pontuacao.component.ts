import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PonctuactionDTOResponse } from '../../../models/Ponctuation/PonctuationDTOResponse';
import { PonctuationService } from 'src/app/services/ponctuation.service';
import { PonctuationDTOTable } from 'src/app/models/Ponctuation/PonctuationDTOTable';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-pontuacao',
  templateUrl: './pontuacao.component.html',
  styleUrls: ['./pontuacao.component.scss']
})
export class PontuacaoComponent {

  public formRangeDate: FormGroup = new FormGroup('');
  listPonctuation = new Array<PonctuactionDTOResponse>();
  listTable = new Array<PonctuationDTOTable>();
  responsePonctuations = new Array<PonctuactionDTOResponse>();
  isprocess: boolean = false;

  constructor(
    private ponctuationService: PonctuationService,
    private fb: FormBuilder,
    private route: Router,) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }
  }

  ngOnInit(): void {
    this.isprocess = true;
    this.configureComponents();


  }

  changeDate() {
    if (this.userIsADM()) {
      this.makeTheListADM();
    }else{
      this.makeTheListNotADM();
    }
  }

  configureComponents() {
    this.formRangeDate = this.fb.group({
      start: [new Date(), [Validators.required]],
      end: [new Date(), [Validators.required]]
    })
    if(this.userIsADM()){
      this.makeTheListADM();

    }else{
      this.makeTheListNotADM();
    }
  }
  async makeTheListNotADM() {
    this.listTable = new Array();
    let startDate: Date = new Date(this.formRangeDate.get('start')?.value);
    let endDate: Date = new Date(this.formRangeDate.get('end')?.value);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999)
    this.listPonctuation = [];
    this.isprocess = true;
    await this.ponctuationService.getAllPonctuationByPeriodAndUser(startDate.getTime(), endDate.getTime()).subscribe(result => {
      this.listTable = result;
      this.isprocess = false;
    })
  }

  userIsADM() {
    return GlobalService.userLoggedIsADM()
  }

  async makeTheListADM() {
    this.listTable = new Array();
    let startDate: Date = new Date(this.formRangeDate.get('start')?.value);
    let endDate: Date = new Date(this.formRangeDate.get('end')?.value);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999)

    this.listPonctuation = [];
    this.isprocess = true;
    await this.ponctuationService.getAllPonctuationByPeriod(startDate.getTime(), endDate.getTime()).subscribe(result => {
      this.listTable = result;
      this.isprocess = false;
    })
  }
}
