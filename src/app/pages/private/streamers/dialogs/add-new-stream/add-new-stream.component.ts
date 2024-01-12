import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { UserDTORequest } from 'src/app/models/User/UserDTORequest';
import { UtilsService } from 'src/app/utils.service';
import { StreamersDTORequest } from '../../../../../models/Streamers/StreamersDTORequest';
import { MessageQuestionAlertDialogComponent } from 'src/app/dialogs/message-question-alert-dialog/message-question-alert-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-stream',
  templateUrl: './add-new-stream.component.html',
  styleUrls: ['./add-new-stream.component.scss'],
})
export class AddNewStreamComponent {
  hide: Boolean = true;
  isAdm: boolean = false
  dataNascimento: number = 0;
  username: string = ""
  password: string = ""
  confirPasswd: string = ""
  currentDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddNewStreamComponent>,
    public dialog: MatDialog,
    private userService: UserService,
    private route: Router
  ) {
    if (GlobalService.user == undefined || GlobalService.user.username.trim().length < 1) {
      this.route.navigate([''])
    }
  }

  ngOnInit(): void {

  }

  selectDate(event: any) {
    this.dataNascimento = new Date(event.value._d).getTime();
  }

  async addStreamButton(): Promise<void> {
    this.insert();

  }

  async insert() {
    if (this.username.trim().length > 0 && this.dataNascimento != 0) {
      if (this.validPassword()) {
        if (!this.menorIdade()) {
          if (this.isAdm) {
            const dialogRef = this.dialog.open(MessageQuestionAlertDialogComponent, {
              data: { message: "tem certeza que deseja adicionar " + this.username + " como administrador?" },
              width: "50%",
              height: "15%"
            });
            await dialogRef.afterClosed().subscribe(response => {
              if (response) {
                this.insertADMUser();
              }
            }, error => {
              this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
            });
          } else {
            this.insertNotADMUser();
          }
        }
      }
    }
  }

  insertNotADMUser() {
    let request = new UserDTORequest();
    let strRequest = new StreamersDTORequest();
    request.username = this.username
    request.password = btoa(this.password);
    request.role = "base_Streamer";
    strRequest.birthday = this.dataNascimento;
    strRequest.twitchName = this.username;
    request.streamersRequestDTO = strRequest;
    this.sendInsert(request);
  }

  insertADMUser() {
    let request = new UserDTORequest();
    let strRequest = new StreamersDTORequest();
    request.username = this.username
    request.password = btoa(this.password);
    request.role = "Admin";
    strRequest.birthday = this.dataNascimento;
    strRequest.twitchName = this.username;
    request.streamersRequestDTO = strRequest;
    this.sendInsert(request);
  }
  async sendInsert(request: UserDTORequest) {
    await this.userService.register(request).subscribe(async result => {
      if (result != null && result.id.trim().length > 0) {
        const dialog = this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Streamer adicionado com sucesso" },
          width: "50%",
          height: "15%"
        });
        await dialog.afterClosed().subscribe(() => this.dialogRef.close())
      } else {
        console.log(result);
        this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Falha ao adicionar Streamer" },
          width: "50%",
          height: "15%"
        })
      }
    }, error => {
      this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
    });
  }
  menorIdade() {
    return UtilsService.getIdade(new Date(this.dataNascimento)) < 18
  }

  validPassword() {
    if (this.password == null || this.password.trim().length < 1 || this.confirPasswd == null || this.confirPasswd.trim().length < 1) {
      return false;
    }
    if (!this.password.match(this.confirPasswd)) {
      return false;
    }
    return true;
  }
  
  cancelarAdd() {
    this.dialogRef.close();
  }

  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }
}
