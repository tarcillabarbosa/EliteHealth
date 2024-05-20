import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private apiUrl = `${environment.API_URL}/appointments`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  bookAppointment(appointmentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/book`, { appointmentId });
  }
}
