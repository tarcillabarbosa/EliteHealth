import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AppointmentsService } from './services/appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    RouterModule,
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
    appointments: any[] = [];
  
    constructor(private appointmentsService: AppointmentsService) {}
  
    ngOnInit(): void {
      this.loadAppointments();
    }
  
    loadAppointments(): void {
      this.appointmentsService.getAppointments().subscribe(data => {
        this.appointments = data;
      });
    }
  
    bookAppointment(appointmentId: number): void {
      this.appointmentsService.bookAppointment(appointmentId).subscribe(() => {
        this.loadAppointments();
      });
    }
  }
  
// export class AppointmentsComponent {
//   email = new FormControl('', [Validators.required, Validators.email]);

//   errorMessage = '';
//   updateErrorMessage() {
//     if (this.email.hasError('required')) {
//       this.errorMessage = 'You must enter a value';
//     } else if (this.email.hasError('email')) {
//       this.errorMessage = 'Not a valid email';
//     } else {
//       this.errorMessage = '';
//     }
//   }

//   appointment?: Appointment[];
//   apiUrl= "http://localhost:3000/products";

//   constructor(private http: HttpClient) {}

//   getCadastro(): void {
//     this.http.get(this.);
//   }
// }
  // import { Component, OnInit } from '@angular/core';
  // import { AppointmentsService } from './services/appointments.service';
  
  // @Component({
  //   selector: 'app-appointments',
  //   standalone: true,
  //   imports: [AppointmentsService],
  //   templateUrl: './appointments.component.html',
  //   styleUrls: ['./appointments.component.css']
  // })
  // export class AppointmentsComponent implements OnInit {
  //   appointments: any[] = [];
  
  //   constructor(private appointmentsService: AppointmentsService) {}
  
  //   ngOnInit(): void {
  //     this.loadAppointments();
  //   }
  
  //   loadAppointments(): void {
  //     this.appointmentsService.getAppointments().subscribe(data => {
  //       this.appointments = data;
  //     });
  //   }
  
  //   bookAppointment(appointmentId: number): void {
  //     this.appointmentsService.bookAppointment(appointmentId).subscribe(() => {
  //       this.loadAppointments();
  //     });
  //   }
  // }
  