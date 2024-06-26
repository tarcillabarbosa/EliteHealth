import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs';
import { Constants } from '../../../commons/constants/constants.enum';
import { AuthService } from '../../services/auth.service';
import { UserCredentials } from '../../models/user.model';
import { EliteImageComponent } from '../../../commons/components/elite-image/elite-image.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    EliteImageComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  login(): void {
    const user: UserCredentials = this.form.getRawValue();
    this.authService
      .login(user.email, user.password) 
      .pipe(first())
      .subscribe({
        next: (res) => {
          localStorage.setItem(Constants.TOKEN_KEY, `Bearer ${res.token}`);
          localStorage.setItem(Constants.USER_INFO, JSON.stringify(res.user));
          this.router.navigate(['/appointments/list']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }}