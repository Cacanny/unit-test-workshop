import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: false,
  template: `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `,
})
export class SpinnerComponent {}
