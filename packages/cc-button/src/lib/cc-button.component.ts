import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cc-button',
  template: `
    <button>
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class CcButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
