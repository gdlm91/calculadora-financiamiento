import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ICalculation, IExtraFee } from '../../model/'

export interface IFinancing {
  init: number;
  rest: number;
}

export class Financing implements IFinancing {
  constructor(public init: number = 0, public rest: number = 0) { }
}

@Injectable()
export class FinancingService {

  private calculationSubject: BehaviorSubject<IFinancing> = new BehaviorSubject(new Financing());

  calculation$: Observable<IFinancing> = this.calculationSubject.asObservable();

  calculate(formValue: ICalculation) {
    let init = formValue.cost * 0.3;

    let rest = init - formValue.prepayment - (formValue.feeQty * formValue.feeCost) - this.calculateExtraFees(formValue.extraFees || []);

    this.calculationSubject.next(new Financing(init, rest));
  }

  private calculateExtraFees(extraFees: IExtraFee[]): number {
    let extraFeesTotal: number = 0;

    extraFees.map((fee) => extraFeesTotal += fee.cost);

    return extraFeesTotal;
  }

}
