import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { APP_ROUTES } from './app.router';
import { RouterModule } from '@angular/router'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HomeComponent } from './home/home.component';
import { TwoComponent } from './two/two.component';
import { ThreeComponent } from './three/three.component';
import { FourComponent } from './four/four.component';
import { FiveComponent } from './five/five.component';
import { SixComponent } from './six/six.component';
import { EndComponent } from './end/end.component';
import { OneComponent } from './one/one.component';

export const firebaseConfig = {
  apiKey: "AIzaSyB9H3j7NzYlTfcvo6VJHpgH8sIPueepzs8",
  authDomain: "online-evaluation-6d54f.firebaseapp.com",
  databaseURL: "https://online-evaluation-6d54f.firebaseio.com",
  projectId: "online-evaluation-6d54f",
  storageBucket: "online-evaluation-6d54f.appspot.com",
  messagingSenderId: "702850725497"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TwoComponent,
    ThreeComponent,
    FourComponent,
    FiveComponent,
    SixComponent,
    EndComponent,
    OneComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES),
    NgxCarouselModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
