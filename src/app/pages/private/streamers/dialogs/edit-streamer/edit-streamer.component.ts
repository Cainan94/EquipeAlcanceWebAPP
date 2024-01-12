import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StreamersDTOResponse } from 'src/app/models/Streamers/StreamersDTOResponse';
import { StreamersDTOTable } from 'src/app/models/Streamers/StreamersDTOTable';
import { UserService } from '../../../../../services/user.service';
import { UserDTOResponse } from 'src/app/models/User/UserDTOResponse';
import { UtilsService } from 'src/app/utils.service';
import { MessageQuestionAlertDialogComponent } from 'src/app/dialogs/message-question-alert-dialog/message-question-alert-dialog.component';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { StreamersDTORequest } from 'src/app/models/Streamers/StreamersDTORequest';
import { UserDTORequest } from 'src/app/models/User/UserDTORequest';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-streamer',
  templateUrl: './edit-streamer.component.html',
  styleUrls: ['./edit-streamer.component.scss']
})
export class EditStreamerComponent {
  editPasssword = false
  hide: Boolean = true;
  isAdm: boolean = false
  dataNascimento: number = 0;
  username: string = ""
  password: string = ""
  confirPasswd: string = ""
  userResponse = new UserDTOResponse();
  dataNascimentoDT = new Date()


  constructor(
    public dialogRef: MatDialogRef<EditStreamerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StreamersDTOTable,
    public dialog: MatDialog,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.startConfigForm();
  }

  startConfigForm() {
    this.userService.getByUsername(this.data.nome).subscribe(result => {
      if (result != null && result.id != null && result.id.trim().length > 0) {
        this.username = result.username;
        this.dataNascimento = result.streamersDTOResponse.birthday
        this.dataNascimentoDT = new Date(this.dataNascimento)
        if (result.role.match("base_Streamer")) {
          this.isAdm = false;
        } if (result.role.match("Admin")) {
          this.isAdm = true;
        }
        this.userResponse = result;
      }
    }, error => {
      this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
    });
  }

  selectDate(event: any) {
    this.dataNascimento = new Date(event.value._d).getTime();
  }

  configForm(res: UserDTOResponse): void {
    console.log(res);
  }

  setCheckBoxAdm(role: string) {
    if (role === 'Streamer') {
      this.isAdm = false;
    } else {
      this.isAdm = true
    }
  }

  async editStreamer() {
    await this.update()
  }

  cancelTrocaSenha() {
    this.editPasssword = false;
    this.startConfigForm()
  }
  trocaSenha() {
    this.editPasssword = true;
    this.startConfigForm()
  }

  validPassword() {
    if (this.editPasssword) {
      if (this.password == null || this.password.trim().length < 1 || this.confirPasswd == null || this.confirPasswd.trim().length < 1) {
        return false;
      }
      if (!this.password.match(this.confirPasswd)) {
        return false;
      }
      return true;
    }
    return true;
  }
  async update() {
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
                this.updateADMUser();
              }
            }, error => {
              this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
            });
          } else {
            this.updateNotADMUser();
          }
        } else {
          this.dialog.open(MessageBoxCustomMessageComponent, {
            data: { message: "Usuário tem menos de 18 anos" },
            width: "50%",
            height: "15%"
          })
        }
      } else {
        this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Senha não confere com o informado" },
          width: "50%",
          height: "15%"
        })
      }
    } else {
      this.dialog.open(MessageBoxCustomMessageComponent, {
        data: { message: "Formulario invalido verifique os campos e tente novamente" },
        width: "50%",
        height: "15%"
      })
    }
  }
  updateNotADMUser() {
    let request = new UserDTORequest();
    let strRequest = new StreamersDTORequest();

    request.id = this.userResponse.id
    strRequest.id = this.userResponse.streamersDTOResponse.id;
    request.username = this.username
    if (this.editPasssword) {
      request.password = btoa(this.password);
    }
    request.role = "base_Streamer";

    strRequest.birthday = this.dataNascimento;
    strRequest.twitchName = this.username;
    strRequest.visible = this.userResponse.streamersDTOResponse.visible;

    request.streamersRequestDTO = strRequest;

    console.log("base_Streamer");

    console.log(this.username);
    console.log(this.isAdm);
    console.log(new Date(this.dataNascimento));
    console.log(request);

    this.sendUpdate(request);
  }
  updateADMUser() {
    let request = new UserDTORequest();
    let strRequest = new StreamersDTORequest();

    request.id = this.userResponse.id
    strRequest.id = this.userResponse.streamersDTOResponse.id;
    request.username = this.username
    if (this.editPasssword) {
      request.password = btoa(this.password);
    }
    request.role = "Admin";

    strRequest.birthday = this.dataNascimento;
    strRequest.twitchName = this.username;
    strRequest.visible = this.userResponse.streamersDTOResponse.visible;

    request.streamersRequestDTO = strRequest;
    this.sendUpdate(request);
  }

  sendUpdate(request: UserDTORequest) {

    this.userService.update(request).subscribe(async result => {
      if (result != null && result.id.trim().length > 0) {
        const dialog = this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Streamer Atualizado com sucesso" },
          width: "50%",
          height: "15%"
        });
        await dialog.afterClosed().subscribe(() => this.dialogRef.close())
      } else {
        console.log(result);
        this.dialog.open(MessageBoxCustomMessageComponent, {
          data: { message: "Falha ao atualizar Streamer" },
          width: "50%",
          height: "15%"
        })

      }
    }, error => {
      this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
    });
  }

  menorIdade(): boolean {
    return UtilsService.getIdade(new Date(this.dataNascimento)) < 18
  }

  closeEdit() {
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

