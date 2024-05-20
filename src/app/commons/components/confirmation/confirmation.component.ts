import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
