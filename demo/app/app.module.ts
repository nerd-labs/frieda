import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CcButtonModule } from 'cc-button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CcButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
