import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICalculation, IExtraFee } from '../../model/'

export interface IFinancing {
  init: number;
  rest: number;
  feeCost: number;
}

export class Financing implements IFinancing {
  constructor(public init: number = 0, public rest: number = 0, public feeCost: number = 0) { }
}

@Injectable()
export class FinancingService {

  private calculationSubject: BehaviorSubject<IFinancing> = new BehaviorSubject(new Financing());

  calculation$: Observable<IFinancing> = this.calculationSubject.asObservable();

  calculate(formValue: ICalculation) {
    let init = formValue.cost * 0.3;

    let restWOExtraFees = init - formValue.prepayment - this.calculateExtraFees(formValue.extraFees || []);

    let feeCost = this.calculateFeeCost(restWOExtraFees, formValue.feeQty);

    let rest = restWOExtraFees - (formValue.feeQty * formValue.feeCost);

    this.calculationSubject.next(new Financing(init, rest, feeCost));
  }

  private calculateExtraFees(extraFees: IExtraFee[]): number {
    let extraFeesTotal: number = 0;

    extraFees.map((fee) => extraFeesTotal += fee.cost);

    return extraFeesTotal;
  }

  private calculateFeeCost(restWOExtraFees: number, feeQty: number): number {
    if (feeQty < 1) return 0;

    let feeCost = Math.floor(restWOExtraFees / feeQty);

    console.log('CalculateFeeCost', feeCost);

    return feeCost;
  }

}
