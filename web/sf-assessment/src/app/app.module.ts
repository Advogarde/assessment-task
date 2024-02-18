import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageComponent } from './message/message.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule, Routes } from '@angular/router';
import { ManageNodesComponent } from './manage-nodes/manage-nodes.component';
import { AppRoutingModule } from './app-routing.module';
import { SignatureInputComponent } from './signature-input/signature-input.component'; // Import the AppRoutingModule


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ManageNodesComponent,
    SignatureInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    PerfectScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule, AppRoutingModule]
})
export class AppModule { }
