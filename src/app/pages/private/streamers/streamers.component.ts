import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StreamersDTOTable } from 'src/app/models/Streamers/StreamersDTOTable';
import { AddNewStreamComponent } from './dialogs/add-new-stream/add-new-stream.component';
import { MessageQuestionAlertDialogComponent } from 'src/app/dialogs/message-question-alert-dialog/message-question-alert-dialog.component';
import { EditStreamerComponent } from './dialogs/edit-streamer/edit-streamer.component';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import { StreamersService } from 'src/app/services/streamers.service';
import { UserService } from 'src/app/services/user.service';
import { UserDTOResponse } from 'src/app/models/User/UserDTOResponse';
import { UserDTORequest } from 'src/app/models/User/UserDTORequest';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';

@Component({
  selector: 'app-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.scss']
})
export class StreamersComponent {
  displayedColumns: string[]
  dataSource = new MatTableDataSource<StreamersDTOTable>();
  selection = new SelectionModel<StreamersDTOTable>(true, []);
  itemSelected: boolean = false;
  editItem: boolean = false;
  isprocess: boolean = false;
  itensSelecteds: StreamersDTOTable[] = [];

  constructor(
    public dialog: MatDialog,
    private route: Router,
    private service: StreamersService,
    private userService: UserService
  ) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }

    this.displayedColumns = [
      'select',
      'Nº',
      'Nome',
      'Ultima Stream'
    ]
  }

  ngOnInit(): void {
    this.isprocess = true;
    this.doDataSource();

  }
  async doDataSource() {
    this.isprocess = true;
    await this.service.getAllStreamersAtivos().subscribe(
      res => this.feedTable(res)
    );
  }

  feedTable(res: StreamersDTOResponse[]): void {
    this.dataSource = new MatTableDataSource<StreamersDTOTable>()
    let dtoTable: StreamersDTOTable[] = [];
    let i = 1;
    res.forEach(item => {
      dtoTable.push(new StreamersDTOTable(i, item.twitchName, item.lastTimeInLive))
      i++
    })
    this.dataSource = new MatTableDataSource<StreamersDTOTable>(dtoTable)
    this.isprocess = false;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(event: any) {

    if (this.isAllSelected()) {
      this.selection.clear();
      this.itensSelecteds = [];
      this.checkItensSelected()
      return;
    }
    this.selection.select(...this.dataSource.data);
    this.itensSelecteds = this.dataSource.data;
    this.checkItensSelected()
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StreamersDTOTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.posicao + 1}`;
  }

  isChecked(event: any, row: any): boolean {
    this.popItensSelecteds(row, event.checked);
    return event.checked
  }

  popItensSelecteds(row: StreamersDTOTable, selected: boolean) {
    if (selected && this.itensSelecteds.findIndex(str => str.nome === row.nome) < 0) {
      this.itensSelecteds.push(row);
    } else {
      if (this.itensSelecteds.findIndex(str => str.nome === row.nome) > -1) {
        this.itensSelecteds.splice(this.itensSelecteds.indexOf(row), 1);
      }
    }
    this.checkItensSelected()
  }

  checkItensSelected() {
    if (this.itensSelecteds.length > 0) {
      this.itemSelected = true;
    }
    else {
      this.itemSelected = false;
    }
    if (this.itensSelecteds.length == 1) {
      this.editItem = true;
    } else {
      this.editItem = false
    }
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddNewStreamComponent, {
      height: '55%',
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.doDataSource(); this.resetSelects()
    })
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(EditStreamerComponent, {
      data: this.itensSelecteds[0],
      height: '75%',
      width: '60%'
    });
    dialogRef.afterClosed().subscribe(() => { this.doDataSource(); this.resetSelects() })
  }

  tdClick(element: StreamersDTOTable) {

    if (this.itensSelecteds.findIndex(str => str.nome === element.nome) < 0) {
      this.itensSelecteds.push(element)
    } else {
      this.itensSelecteds.splice(this.itensSelecteds.indexOf(element), 1);
    }

    this.checkItensSelected();
  }

  AddStreamer() {
    this.openDialogAdd();
  }

  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }

  questionDelete(message: string, width: string, height: string): void {
    const dialogRef = this.dialog.open(MessageQuestionAlertDialogComponent, {
      data: { message: message },
      width: width,
      height: height
    });
    let indexDelet = 0
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itensSelecteds.forEach(item => {
          this.userService.getByUsername(item.nome).subscribe(
            ret => {
              let userResponse = new UserDTORequest()
              userResponse.id = ret.id;
              this.userService.delete(userResponse).subscribe(
                ret => {                  
                  indexDelet++;
                  if(indexDelet >= this.itensSelecteds.length){
                    this.openDialogCustomMessage("Usuário deletado com sucesso", "40%", "15%"); 
                    this.doDataSource(); 
                    this.resetSelects()
                  }
                },
                err => console.log(err)
              )
            },
            err => console.log(err)
          )
        })
      }
    })
  }

  resetSelects() {
    this.itensSelecteds = [];
    this.selection.clear();
    this.isAllSelected();
    this.checkItensSelected();
  }

  questionEdit(message: string, width: string, height: string): void {
    const dialogRef = this.dialog.open(MessageQuestionAlertDialogComponent, {
      data: { message: message },
      width: width,
      height: height
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDialogEdit();
      }
    })
  }

  deleteStreamer() {
    this.questionDelete("Tem certeza que deseja remover esse Streamer da plataforma?", "60%", "15%")
  }

  editStreamer() {
    this.questionEdit("Tem certeza que deseja Editar o streamer? " + this.itensSelecteds[0].nome + "?", "60%", "15%")
  }

  deleteStream() {
    if (this.itensSelecteds.length > 1) {
      this.questionDelete("Tem certeza que deseja EXCLUIR " + this.itensSelecteds.length + "streamers?", "60%", "15%")
    } else {
      this.questionDelete("Tem certeza que deseja EXCLUIR  " + this.itensSelecteds[0].nome + "?", "60%", "15%")
    }
  }
}
