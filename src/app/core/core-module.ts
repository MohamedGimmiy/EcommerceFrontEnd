import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBar } from './nav-bar/nav-bar';
import { AppRoutingModule } from "../app-routing-module";
import { RouterLink } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    NavBar
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterLink,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule
],
  exports: [
    NavBar
  ]
})
export class CoreModule { }
