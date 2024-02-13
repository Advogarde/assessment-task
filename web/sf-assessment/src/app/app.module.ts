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
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        PerfectScrollbarModule,
        MatAutocompleteModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
