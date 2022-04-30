import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BoxComponent } from './shared/components/box/box.component';
import { RandomButtonComponent } from './shared/components/header/random-button/random-button.component';
import { ClearButtonComponent } from './shared/components/header/clear-button/clear-button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClipboardModule } from '@angular/cdk/clipboard';

import { StoreModule } from '@ngrx/store';
import { BorderReducer } from './shared/redux/reducers/border.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BoxComponent,
    RandomButtonComponent,
    ClearButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    ClipboardModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('border', BorderReducer),
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1250 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
