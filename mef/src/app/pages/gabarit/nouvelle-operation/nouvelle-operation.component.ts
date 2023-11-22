import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CompteComptable } from 'src/app/models/comptecomptable';
import { Operation } from 'src/app/models/operation';

@Component({
  selector: 'app-nouvelle-operation',
  templateUrl: './nouvelle-operation.component.html',
  styleUrls: ['./nouvelle-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NouvelleOperationComponent implements OnInit {
  @Input()
  comptes: CompteComptable[] = [];

  @Output()
  ajouterOperation = new EventEmitter<Operation>();

  operationForm!: FormGroup;
  idOperationCtrl!: FormControl;
  compteComptableIdOperationCtrl!: FormControl;
  typeOperationOperationCtrl!: FormControl;
  tauxOperationCtrl!: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm();
    console.log(this.operationForm.value);
  }

  private initControls(): void {
    this.idOperationCtrl = this.fb.control(0, Validators.required);
    this.compteComptableIdOperationCtrl = this.fb.control(
      '',
      Validators.required
    );
    this.typeOperationOperationCtrl = this.fb.control('', Validators.required);
    this.tauxOperationCtrl = this.fb.control('', Validators.required);
  }

  private initForms(): void {
    this.operationForm = this.fb.group({
      id: this.idOperationCtrl,
      compteComptableId: this.compteComptableIdOperationCtrl,
      typeOperation: this.typeOperationOperationCtrl,
      taux: this.tauxOperationCtrl,
    });
  }

  private resetForm(): void {
    this.initControls();
    this.initForms();
  }

  public enregistrer(): void {
    console.log(this.operationForm.value);
    this.ajouterOperation.emit(this.operationForm.value);
    this.resetForm();
    console.log('--------------------------');
    console.log(this.operationForm.value);
  }
}
