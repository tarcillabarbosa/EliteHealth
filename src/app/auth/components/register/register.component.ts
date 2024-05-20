import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlState, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { RouterOutlet } from '@angular/router';
// import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterOutlet
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  register(): void {
    const user: User = this.form.getRawValue();
    this.authService
      .register(user)
      .pipe(first())
      .subscribe({
        complete: () => {
          this.router.navigate(['auth', 'login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  }