// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-auth',
//   standalone: true,
//   imports: [],
//   templateUrl: './auth.component.html',
//   styleUrl: './auth.component.scss'
// })
// export class AuthComponent {

// }

// import { Component } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe((success: any) => {
      if (success) {
        this.router.navigate(['/appointments']);
      } else {
        alert('Erro ao logar');
      }
    });
  }
}


