import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-generic-section',
  templateUrl: './header-generic-section.component.html',
  styleUrl: './header-generic-section.component.css'
})
export class HeaderGenericSectionComponent {
  constructor(private location: Location) {
    // Constructor
  }
  goBack() {
    this.location.back();
  }
}
