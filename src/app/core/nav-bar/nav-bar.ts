import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {

  visible: boolean = false;
  ToggleDropdown(){
    this.visible = !this.visible;
  }
}
