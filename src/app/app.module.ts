import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { CoreModule } from './core/core.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptor } from './core/interceptors/api-interceptor';
import { fakeBackendProvider } from './core/interceptors/FakeBackendInterceptor';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { HomeComponent } from './components/home/home.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { SimpleAlertErrorComponent } from './shared/alerts/simple-alert-error/simple-alert-error.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, RegisterComponent, SimpleAlertErrorComponent
],
  imports: [
    CommonModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    SideMenuModule,
    SlideshowModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [SimpleAlertErrorComponent]
})
export class AppModule { }
