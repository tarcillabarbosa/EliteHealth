import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-message-warn',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './message-warn.component.html',
  styleUrl: './message-warn.component.scss',
})
export class MessagewarnComponent {
  constructor(
    public dialogRef: MatDialogRef<MessagewarnComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
