import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CommonMaterialModule } from './common-material/common-material.module';
import { LoginRegisterModule } from './login-register/login-register.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    LoginRegisterModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
