import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { HeaderComponent } from './commons/header/header.component';
import { AppointmentsService } from './modules/appointments/services/appointments.service'

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, AppointmentsComponent, HeaderComponent,  AppointmentsService],
  imports: [RouterOutlet, AppointmentsComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EliteSaude';
};
  