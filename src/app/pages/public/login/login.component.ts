import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxCustomMessageComponent } from 'src/app/dialogs/message-box-custom-message/message-box-custom-message.component';
import { UserDTOResponse } from 'src/app/models/User/UserDTOResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup('');
  hide: boolean = true;
  logo = GlobalService.logo
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value).subscribe(res=>{
       this.finishLogin(res); 
      }, error => {
        this.openDialogCustomMessage(error.error.detailedMessage, "50%", "15%")
      });
    }
  }
  openDialogCustomMessage(message: string, width: string, height: string): void {
    this.dialog.open(MessageBoxCustomMessageComponent, {
      data: { message: message },
      width: width,
      height: height
    });
  }

  finishLogin(user:UserDTOResponse): void {
    GlobalService.user = user;
    this.route.navigate(['/home']);
  }
}
