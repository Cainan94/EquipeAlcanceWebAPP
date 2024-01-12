import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';


//Angular Material Components
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './pages/private/home/home.component';
import { StreamersComponent } from './pages/private/streamers/streamers.component';
import { AddNewStreamComponent } from './pages/private/streamers/dialogs/add-new-stream/add-new-stream.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MessageBoxCustomMessageComponent } from './dialogs/message-box-custom-message/message-box-custom-message.component';
import { MessageQuestionAlertDialogComponent } from './dialogs/message-question-alert-dialog/message-question-alert-dialog.component';
import { EditStreamerComponent } from './pages/private/streamers/dialogs/edit-streamer/edit-streamer.component';
import { HttpClientModule } from '@angular/common/http';
import { LiveScheduleComponent } from './pages/private/live-schedule/live-schedule.component';
import { AddScheduleComponent } from './pages/private/live-schedule/dialogs/add-schedule/add-schedule.component';
import { EditScheduleComponent } from './pages/private/live-schedule/dialogs/edit-schedule/edit-schedule.component';
import { PontuacaoComponent } from './pages/private/pontuacao/pontuacao.component';
import { EquipeAlcancePortfoliaComponent } from './pages/public/equipe-alcance-portfolia/equipe-alcance-portfolia.component';
import { WhatchStreamComponent } from './pages/private/whatch-stream/whatch-stream.component';
import { SideMenuComponent } from './pages/private/side-menu/side-menu.component';
import { SideMenuPublicComponent } from './pages/public/side-menu-public/side-menu-public.component';
import { PrepareTowatchComponent } from './pages/private/prepare-towatch/prepare-towatch.component';


export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD/MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'DD/MM/YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    StreamersComponent,
    AddNewStreamComponent,
    MessageBoxCustomMessageComponent,
    MessageQuestionAlertDialogComponent,
    EditStreamerComponent,
    LiveScheduleComponent,
    AddScheduleComponent,
    EditScheduleComponent,
    PontuacaoComponent,
    EquipeAlcancePortfoliaComponent,
    WhatchStreamComponent,
    SideMenuComponent,
    SideMenuPublicComponent,
    PrepareTowatchComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
