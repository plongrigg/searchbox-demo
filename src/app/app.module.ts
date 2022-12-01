import { MatListModule } from '@angular/material/list';
import { NgxMatSearchboxModule } from '@fgrid-ngx/mat-searchbox';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    ScrollingModule,
    FlexLayoutModule,

    // must call with forRoot or forChild, either with no parameters, in which case the default search service
    // will be installed or supply a SearchboxConfig object to install cusom search logic
    NgxMatSearchboxModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
