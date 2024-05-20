import { Routes } from '@angular/router';
import { AppointmentsComponent } from './modules/appointments/appointments.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthService } from './auth/services/auth.service';

export const routes: Routes = [
{
    path: 'login',
    component: LoginComponent,},

{
    path: 'register',
    component: RegisterComponent,
},

// {
//         path: '',
//         redirectTo: 'login',
//         pathMatch: 'full',
//     },

 {  path: 'appointments',
    component: AppointmentsComponent,
},

// { path: 'auth',
//     component: AuthService,
//     children: [ {
//         path: 'login',
//         component: LoginComponent,
// } ] ,
// }
];
