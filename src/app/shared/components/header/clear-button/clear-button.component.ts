import { Component } from '@angular/core';
import { BorderFacade } from 'src/app/shared/redux/facades/border.facade';

@Component({
  selector: 'app-clear-button',
  templateUrl: './clear-button.component.html',
  styleUrls: ['./clear-button.component.scss'],
})
export class ClearButtonComponent {
  constructor(private borderFacade: BorderFacade) {}

  onClick() {
    this.borderFacade.clear();
  }
}
