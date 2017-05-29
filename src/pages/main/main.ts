import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Calculation, ExtraFee } from '../../app/data-model.ts';

@Component({
  selector: 'main-page',
  templateUrl: 'main.html'
})
export class MainPage implements OnInit {

  form: FormGroup;
  formValue: any;
  rest: number;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.calculateForm();
  }

  calculateForm() {
    this.form.valueChanges.forEach(
      (value) => {
        let extraFeesTotal: number = 0;

        this.formValue = value;

        this.formValue.extraFees.map((fee) => extraFeesTotal += fee.cost);

        this.rest = value.cost - value.init - (value.feeQty * value.feeCost) - extraFeesTotal;
      })
  }

  refresh() {
    this.form.reset({
      cost: 0,
      init: 0,
      feeQty: 0,
      feeCost: 0,
      extraFees: []
    });
  }

  createForm() {
    this.form = this.fb.group(new Calculation());

    this.form.addControl('extraFees', this.fb.array([]));
  }

  get extraFees(): FormArray {
    return this.form.get('extraFees') as FormArray;
  }

  addExtraFee() {
    this.extraFees.push(this.fb.group(new ExtraFee()));
  }

  removeExtraFee(i: number) {
    this.extraFees.removeAt(i);
  }

}
