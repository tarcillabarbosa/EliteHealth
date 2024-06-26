import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Subject, first } from 'rxjs';
import { ConfirmationComponent } from '../../../../commons/components/confirmation/confirmation.component';
import { DateParserService } from '../../../../commons/services/date-parser.service';
import { AppointmentsService } from '../../services/appointments.service';
import { PermissionsService } from '../../services/permissions.service';
import { AuthService } from '../../../../auth/services/auth.service';
import {
  appointmentStatusDict,
  Appointment,
} from './../../models/appointment.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule, MatIconModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  protected ngUnsubscribe = new Subject();

  appointments: Appointment[] = [];

  filteredAppointments: Appointment[] = [];

  statusDict = appointmentStatusDict;

  constructor(
    private productsService: AppointmentsService,
    public dialog: MatDialog,
    private router: Router,
    public authService: AuthService,
    public dateParser: DateParserService,
    public permissions: PermissionsService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getAppointments();
    }, 0);
  }

  getAppointments(): void {
    this.productsService
      .getAppointments()
      .pipe(first())
      .subscribe({
        next: (res: Appointment[]) => {
          console.log(res);
          this.appointments = res;
          this.sortAppointmentsByDatetime();
        },
        error: (err) => console.error(err),
      });
  }

  sortAppointmentsByDatetime(): void {
    this.appointments = this.appointments.sort((a, b) => {
      const dateTimeA = this.dateParser.getAppointmentFullDate(a);
      const dateTimeB = this.dateParser.getAppointmentFullDate(b);
      return dateTimeB.getTime() - dateTimeA.getTime();
    });
  }

  onDelete(id: string): void {
    this.productsService
      .deleteAppointment(id)
      .pipe(first())
      .subscribe({
        error: (err) => console.error(err),
        complete: () => this.getAppointments(),
      });
  }

  openDeleteConfirmationDialog(id: string): void {
    this.dialog
      .open(ConfirmationComponent, {
        width: '250px',
        disableClose: true,
        data: {
          id,
        },
      })
      .afterClosed()
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          this.onDelete(id);
        }
      });
  }

  editAppointment(id: string): void {
    this.router.navigate(['appointments', 'edit', id]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}

