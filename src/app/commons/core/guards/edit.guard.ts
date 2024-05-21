import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Appointment } from '../../../modules/appointments/models/appointment.model';
import { AppointmentsService } from '../../../modules/appointments/services/appointments.service';
import { PermissionsService } from '../../../modules/appointments/services/permissions.service';

export const editGuard: CanActivateFn = async (activatedRoute, state) => {
  const { id } = activatedRoute.params;

  if (!id) {
    console.log('Nenhum agendamento para editar');
    return false;
  }

  const appointmentsService = inject(AppointmentsService);
  const permissionsService = inject(PermissionsService);

  try {
    const apptm: Appointment | null = await firstValueFrom(
      appointmentsService.getAppointmentById(id)
    );

    if (!apptm) {
      console.log('Invalid appointment:');
      console.log({ apptm });
      return false;
    }

    return permissionsService.canEnterEditPage(apptm);
  } catch (error) {
    console.error(error);
    return false;
  }
};
