import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FabContainer } from 'ionic-angular';

import { Calculation, ExtraFee } from '../../app/data-model.ts';

@Component({
  selector: 'main-page',
  templateUrl: 'main.html'
})
export class MainPage implements OnInit {

  form: FormGroup;
  init: number;
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

        this.init = value.cost * 0.3;

        value.extraFees.map((fee) => extraFeesTotal += fee.cost);

        this.rest = this.init - value.prepayment - (value.feeQty * value.feeCost) - extraFeesTotal;
      })
  }

  createForm() {
    this.form = this.fb.group(new Calculation());

    this.form.addControl('extraFees', this.fb.array([]));
  }

  get extraFees(): FormArray {
    return this.form.get('extraFees') as FormArray;
  }

  refresh(fab: FabContainer) {
    this.form.reset({
      cost: 0,
      prepayment: 0,
      feeQty: 0,
      feeCost: 0,
      extraFees: []
    });

    fab.close();
  }

  addExtraFee(fab: FabContainer) {
    this.extraFees.push(this.fb.group(new ExtraFee()));

    fab.close();
  }

  removeExtraFee(i: number) {
    this.extraFees.removeAt(i);
  }

}
