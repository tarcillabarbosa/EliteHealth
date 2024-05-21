import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  username = '';
    password = '';
  
    constructor(private authService: AuthService, private router: Router) {}
  
    login(): void {
      this.authService.login(this.username, this.password).subscribe((success: any) => {
        if (success) {
          this.router.navigate(['/appointments']);
        } else {
          alert('Erro no login');
        }
      });
    }
}





// import { Component } from '@angular/core';
// import { AuthService } from './services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [],
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.scss']
// })
// export class LoginComponent {
//   username = '';
//   password = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   login(): void {
//     this.authService.login(this.username, this.password).subscribe((success: any) => {
//       if (success) {
//         this.router.navigate(['/appointments']);
//       } else {
//         alert('Erro ao logar');
//       }
//     });
//   }
// }
