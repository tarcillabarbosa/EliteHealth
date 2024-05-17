import { Routes } from '@angular/router';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { LoginComponent } from './auth/auth.component';

export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent,},

 {  path: 'appointments',
    component: AppointmentsComponent,
}
];
