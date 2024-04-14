import {Component, OnInit} from '@angular/core';
import {ClientsService, IClient} from "../clients.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatDialog} from "@angular/material/dialog";
import {AddClientDialogComponent} from "../add-client-dialog/add-client-dialog.component";
import {CommonModule} from "@angular/common";
import {MatChip} from "@angular/material/chips";
import {DeleteClientDialogComponent} from "../delete-client-dialog/delete-client-dialog.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatFormField, MatLabel, MatInput, NgxMaskDirective, MatButtonModule, CommonModule, MatChip],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  dataSource = new MatTableDataSource<IClient>();
  displayedColumns: string[] = ['name', 'rate', 'activationDate', 'hasTrialLesson', 'phone', 'actions'];

  constructor(
    public clientsService: ClientsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.clientsService.getClients().subscribe(c => {
      this.dataSource.data = c
    })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '100%',
      maxWidth: 600
    });
  }

  openDeleteDialog(id: string, name: string) {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      width: '100%',
      maxWidth: 600,
      data: {
        id,
        name
      }
    });
  }
}
