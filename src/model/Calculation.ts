import { ExtraFee } from "./ExtraFee";

export interface ICalculation {
  cost: number;
  prepayment: number;
  feeQty: number;
  feeCost: number;
  extraFees?: ExtraFee[];
}

export class Calculation implements ICalculation {
  cost = 0;
  prepayment = 0;
  feeQty = 0;
  feeCost = 0;
  extraFees = [];
}
