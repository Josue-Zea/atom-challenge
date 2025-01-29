import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MESSAGES_CONSTANTS } from './constants/messages.constants';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { FullpageLoaderComponent } from './components/fullpage-loader/fullpage-loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksListHeaderComponent } from './pages/dashboard/tasks-list-header/tasks-list-header.component';
import { TaskEmptyMessagesComponent } from './pages/dashboard/task-empty-messages/task-empty-messages.component';

export const CONSTANTS = 'CONSTANTS';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    TaskCardComponent,
    TaskFormComponent,
    FullpageLoaderComponent,
    NavbarComponent,
    TasksListHeaderComponent,
    TaskEmptyMessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: CONSTANTS, useValue: MESSAGES_CONSTANTS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
