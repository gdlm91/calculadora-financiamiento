export interface IExtraFee {
  cost: number;
  name: string;
}

export class ExtraFee implements IExtraFee {
  cost: number = 0;
  name: string = '';
}
