import { Component } from '@angular/core';

/**
 * Generated class for the ExtraFeesComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'extra-fees',
  templateUrl: 'extra-fees.html'
})
export class ExtraFeesComponent {

  text: string;

  constructor() {
    console.log('Hello ExtraFeesComponent Component');
    this.text = 'Hello World';
  }

}
