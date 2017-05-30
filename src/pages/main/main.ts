import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FabContainer } from 'ionic-angular';
import { Observable } from "rxjs/Observable";

import { Calculation, ExtraFee, ICalculation } from '../../model';
import { FinancingService, IFinancing } from '../../providers/financing/financing.service';

@Component({
  selector: 'main-page',
  templateUrl: 'main.html'
})
export class MainPage implements OnInit {

  form: FormGroup;
  calculation$: Observable<IFinancing>;

  constructor(
    private fb: FormBuilder,
    private financingService: FinancingService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.calculation$ = this.financingService.calculation$;

    this.calculateForm();
  }

  refresh(fab: FabContainer) {
    this.form.reset(new Calculation());
    this.form.setControl('extraFees', this.fb.array([]));

    fab.close();
  }

  addExtraFee(fab: FabContainer) {
    this.extraFees.push(this.fb.group(new ExtraFee()));

    fab.close();
  }

  removeExtraFee(i: number) {
    this.extraFees.removeAt(i);
  }

  get extraFees(): FormArray {
    return this.form.get('extraFees') as FormArray;
  }

  private createForm() {
    this.form = this.fb.group(new Calculation());

    // Had to change this to set instead of add... new Calcualtion() creates a control from and array.
    this.form.setControl('extraFees', this.fb.array([]));
  }

  private calculateForm() {
    this.form.valueChanges.forEach(
      (formValue: ICalculation) => this.financingService.calculate(formValue))
  }

}
