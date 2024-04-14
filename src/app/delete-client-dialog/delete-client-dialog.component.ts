import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ClientsService} from "../clients.service";


export interface DialogData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-delete-client-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './delete-client-dialog.component.html',
  styleUrl: './delete-client-dialog.component.scss'
})
export class DeleteClientDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clientsService: ClientsService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.clientsService.removeClient(this.data.id)
    this.dialogRef.close();
  }
}
