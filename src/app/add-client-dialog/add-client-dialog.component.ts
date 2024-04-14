import { Component } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective, provideNgxMask} from "ngx-mask";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import moment, {Moment} from "moment";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {ClientsService} from "../clients.service";
import {nanoid} from "nanoid";

interface IRate {
  id: string,
  value: string
}

@Component({
  selector: 'app-add-client-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatButton,
    NgxMaskDirective,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './add-client-dialog.component.html',
  styleUrl: './add-client-dialog.component.scss',
  providers: [
    provideNgxMask(),
  ]
})
export class AddClientDialogComponent {

  rates: IRate[]  = [
    { id: 'Стандарт', value: 'Стандарт' },
    { id: 'Стандарт+', value: 'Стандарт+' },
    { id: 'Премиум', value: 'Премиум' }
  ];

  clientForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddClientDialogComponent>,
    public clientsService: ClientsService
  ) {
    this.clientForm = this._createClientForm()
  }

  private _createClientForm() {
    return new FormGroup({
      "name": new FormControl("", [
        Validators.required,
        Validators.pattern(/^[а-яА-Яa-zA-Z]*$/)
      ]),
      "rate": new FormControl("", [
        Validators.required
      ]),
      "activationDate": new FormControl(moment([moment().year(), moment().month(), moment().date()]), [
        this.dateValidator
      ]),
      "hasTrialLesson": new FormControl(true),
      "referralInfo": new FormControl(""),
      "phone": new FormControl("7"),
    });
  }

  private dateValidator = (ctrl: AbstractControl): ValidationErrors | null => {
    if (!ctrl.value) {
      return {
        format: true
      };
    }

    const momentValue: Moment = ctrl.value;
    const diffWithoutTime = momentValue.diff(moment([moment().year(), moment().month(), moment().date()]), "days");
    if (diffWithoutTime > 0) {
      return {
        logic: true
      };
    }
    return null;
  }

  get name() {
    return this.clientForm.get('name');
  }

  get rate() {
    return this.clientForm.get('rate');
  }

  get activationDate() {
    return this.clientForm.get('activationDate');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  submit(){
    const rawClient =  this.clientForm.value;
    this.clientsService.addClient({
      ...rawClient,
      id: nanoid(),
      activationDate: rawClient.activationDate.format('LL')
    })
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
