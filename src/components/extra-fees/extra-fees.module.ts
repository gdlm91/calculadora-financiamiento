import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtraFeesComponent } from './extra-fees';

@NgModule({
  declarations: [
    ExtraFeesComponent,
  ],
  imports: [
    IonicPageModule.forChild(ExtraFeesComponent),
  ],
  exports: [
    ExtraFeesComponent
  ]
})
export class ExtraFeesComponentModule {}
