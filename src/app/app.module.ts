import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';
import { MainPage } from '../pages/main/main';
import { ExtraFeesComponent } from '../components/extra-fees/extra-fees';
import { FinancingService } from '../providers/financing/financing.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPage,
    ExtraFeesComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FinancingService
  ]
})
export class AppModule { }
