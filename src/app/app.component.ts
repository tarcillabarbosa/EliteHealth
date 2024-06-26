import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { HeaderComponent } from './commons/components/header/header.component';
import { AppointmentsService } from './modules/appointments/services/appointments.service'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, AppointmentsComponent, HeaderComponent,  AppointmentsService],
  imports: [RouterOutlet, AppointmentsComponent, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EliteSaude';
};
  